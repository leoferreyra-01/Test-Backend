import { pool } from '../config/db';
import { Persona, PersonaInfo } from '../models/persona';
import { RowDataPacket } from 'mysql2';

export const findAllPersonas = (search: PersonaInfo): Promise<Persona[] | []> => {

  var where = '';
  if (search.dni) where += `${where.length?' AND':''} dni LIKE '%${search.dni}%'`;
  if (search.nombre) where += `${where.length?' AND':''} nombre LIKE '%${search.nombre}%'`;
  if (search.edad) where += `${where.length?' AND':''} edad LIKE '%${search.edad}%'`;

  const query = `SELECT * FROM persona ${where.length?('WHERE'+where):''}`;

  return new Promise((resolve, reject) => {
      var personas: Persona[] = [];
      try {
          pool.query(query, function(error: any, rows: RowDataPacket[]) {

              if (error) return reject(error.code);      
              if (rows.length <= 0) return reject('Not found');             

              for (let i = 0; i < rows.length; i++) {
                  const persona: Persona = {
                      dni: rows[i].dni,
                      nombre: rows[i].nombre,
                      apellido: rows[i].apellido,
                      edad: rows[i].edad,
                      foto: rows[i].foto,
                  };

                  if (persona) personas.push(persona);
              }
              
              return resolve(personas);
          });                            
      } catch (error) {
          return reject('Error database');
      }
  });
}