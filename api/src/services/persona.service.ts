import { Direccion } from './../models/direccion';
import { pool } from '../config/db';
import { Persona, PersonaConDirecciones, PersonaInfo } from '../models/persona';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { findAllDireccionesByDni } from './direccion.service';
const exporter = require('json2csv').Parser;


export const findAllPersonas = (search: PersonaInfo): Promise<PersonaConDirecciones[] | []> => {

  var where = '';
  if (search.dni) where += `${where.length?' AND':''} dni LIKE '%${search.dni}%'`;
  if (search.nombre) where += `${where.length?' AND':''} nombre LIKE '%${search.nombre}%'`;
  if (search.edad) where += `${where.length?' AND':''} edad = '${search.edad}'`;

  const query = `SELECT * FROM persona ${where.length?('WHERE'+where):''}`;

  return new Promise((resolve, reject) => {
    var personas: PersonaConDirecciones[] = [];
    try {
      pool.query(query, async function(error: any, rows: RowDataPacket[]) {
        try {
          if (error) return reject(error.code);      
          if (rows.length <= 0) return reject('Not found');   
          
          for (let i = 0; i < rows.length; i++) {
              const persona: PersonaConDirecciones = {
                  dni: rows[i].dni,
                  nombre: rows[i].nombre,
                  apellido: rows[i].apellido,
                  edad: rows[i].edad,
                  foto: rows[i].foto,
                  direcciones: []
              };

              if (persona) {
                console.log(persona);
                const direcciones = await findAllDireccionesByDni(persona.dni);
                if (direcciones) {
                  persona.direcciones = direcciones;
                }
                console.log(direcciones);
                personas.push(persona)
            };
            }

            return resolve(personas);
          } catch (error) {
            return reject('Error database');
          }
        });                            
    } catch (error) {
        return reject('Error database');
    }
  });
}

export const findPersonaByDni = (dni: string): Promise<PersonaConDirecciones[] | []> => {

  const query = `SELECT * FROM persona WHERE dni = '${dni}'`;

return new Promise((resolve, reject) => {
      var personas: PersonaConDirecciones[] = [];
      try {
          pool.query(query, async function(error: any, rows: RowDataPacket[]) {
            try {
              if (error) return reject(error.code);      
              if (rows.length <= 0) return reject('Not found');       
              
              console.log(rows)

                  const persona: PersonaConDirecciones = {
                      dni: rows[0].dni,
                      nombre: rows[0].nombre,
                      apellido: rows[0].apellido,
                      edad: rows[0].edad,
                      foto: rows[0].foto,
                      direcciones: []
                  };

                  if (persona) {
                    console.log(persona);
                    const direcciones = await findAllDireccionesByDni(persona.dni);
                    if (direcciones) {
                        persona.direcciones = direcciones;
                    }
                    console.log(direcciones);
                    personas.push(persona)
                };
              
              return resolve(personas);
            } catch (error) {
              return reject('Error database');
            }
          });                            
      } catch (error) {
          return reject('Error database');
      }
  });
}

export const createNuevaPersona = (persona: Persona): Promise<void> => {

  const query = `INSERT INTO persona (dni, nombre, apellido, edad, foto)
      VALUES ('${persona.dni}', '${persona.nombre}', '${persona.apellido}', '${persona.edad}', '${persona.foto}');`;

  return new Promise((resolve, reject) => {
      try {
          pool.query(query, async function(error : any, result: ResultSetHeader) { 

              if (error) return reject(error.code);      
              
              var nuevaPersona: Persona = {
                dni: persona.dni,
                nombre: persona.nombre,
                apellido: persona.apellido,
                edad: persona.edad,
                foto: persona.foto
              }

              return resolve();
          });                            
      } catch (error) {
          return reject('Error database');
      }
  });
}

export const updatePersonaActual = (persona: Persona): Promise<void> => {

  let varQuery: string = '';
  if (persona.nombre) { varQuery += ` nombre='${persona.nombre}'`; }
  if (persona.apellido) { varQuery += `${varQuery.length?',':''} apellido='${persona.apellido}'`; }
  if (persona.edad) { varQuery += `${varQuery.length?',':''} edad='${persona.edad}'`; }
  if (persona.foto) { varQuery += `${varQuery.length?',':''} foto='${persona.foto}'`; }


  const query = `UPDATE persona SET ${varQuery} WHERE dni=${persona.dni}`;

  return new Promise((resolve, reject) => {
      if (!varQuery.length) return reject('Error data');

      try {
          pool.query(query, async function(error: any, result: ResultSetHeader) { 
              if (error) return reject(error.code);      
              if (result.affectedRows === 0) return reject('Not found');      

              return resolve();
          });                            
      } catch (error) {
          return reject('Error database');
      }
  });
}

export const deletePersonaByDni = (dni: string): Promise<void> => {

  const query = `DELETE FROM persona WHERE dni=${dni}`;

  return new Promise((resolve, reject) => {
      try {
          pool.query(query, function(error: any, result: ResultSetHeader) {
              if (error) return reject(error.code);      
              if (result.affectedRows === 0) return reject('Not found');            
              return resolve();
          });                            
      } catch (error) {
          return reject('Error database');
      }
  });
}
//TODO getPersonasExportar
export const exportPersonas = (personas: PersonaConDirecciones[]): Promise< any > => {

  return new Promise((resolve, reject) => {
    try {
      const file = ['dni', 'nombre', 'apellido', 'edad', 'foto', 'direcciones']
      const opts = {file}
      const json = new exporter({opts})
      const csv = json.parse(personas);

      return resolve(csv);
    } catch (error) {
      return reject('Error al exportar personas');
    }
  });
}