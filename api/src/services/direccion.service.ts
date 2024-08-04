import { pool } from '../config/db';
import { Persona, PersonaInfo } from '../models/persona';
import { Direccion, DireccionInfo } from '../models/direccion';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const findAllDireccionesByDni = (personadni: string): Promise<any[] | []> => {

  const query = `SELECT * FROM direccion WHERE personadni = '${personadni}'`;

  return new Promise((resolve, reject) => {
      var direcciones: Direccion[] = [];
      try {
          pool.query(query, function(error: any, rows: RowDataPacket[]) {

              if (error) return reject(error.code);      
              if (rows.length <= 0) return resolve(rows);             

              for (let i = 0; i < rows.length; i++) {
                  const direccion: Direccion = {
                      id: rows[i].id,
                      calle: rows[i].calle,
                      altura: rows[i].altura,
                      ciudad: rows[i].ciudad,
                      personadni: rows[i].personadni,
                  };

                  if (direccion) direcciones.push(direccion);
              }
              
              return resolve(direcciones);
          });                            
      } catch (error) {
          return reject('Error database');
      }
  });
}

export const asociarNuevaDireccion = (direccion: DireccionInfo): Promise<Direccion> => {

  const query = `INSERT INTO direccion (calle, altura, ciudad, personadni)
      VALUES ('${direccion.calle}', '${direccion.altura}', '${direccion.ciudad}', '${direccion.personadni}');`;

  return new Promise((resolve, reject) => {
      try {
          pool.query(query, async function(error : any, result: ResultSetHeader) { 

              if (error) return reject(error.code);      
              
              var nuevaDireccion: Direccion = {
                id: result.insertId,
                calle: direccion.calle!,
                altura: direccion.altura!,
                ciudad: direccion.ciudad!,
                personadni: direccion.personadni!
              }

              return resolve(nuevaDireccion);
          });                            
      } catch (error) {
          return reject('Error database');
      }
  });
}

export const updateDireccionActual = (direccion: Direccion): Promise<void> => {

  let varQuery: string = '';
  if (direccion.calle) { varQuery += ` calle='${direccion.calle}'`; }
  if (direccion.altura) { varQuery += `${varQuery.length?',':''} altura='${direccion.altura}'`; }
  if (direccion.ciudad) { varQuery += `${varQuery.length?',':''} ciudad='${direccion.ciudad}'`; }


  const query = `UPDATE direccion SET ${varQuery} WHERE dni=${direccion.id}`;

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

export const deleteDireccionById = (id: string): Promise<void> => {

  const query = `DELETE FROM direccion WHERE dni=${id}`;

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