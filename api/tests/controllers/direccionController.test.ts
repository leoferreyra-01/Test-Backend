import request from 'supertest';
import { default as app } from '../../src/app';
import { findAllDireccionesByDni } from '../../src/services/direccion.service';

describe('Direccion Controller', () => {

  beforeAll(async () => {
    const newPersona = {
      dni: 45678910,
      nombre: 'Pedro',
      apellido: 'Sanches',
      edad: 48,
      foto: 'https://foto4.jpg'
    };
    await request(app).post('/api/personas').send(newPersona);
  });

  afterAll(async () => {
    await request(app).delete(`/api/personas/45678910`);
  });

  it('debería crear una nueva direccion', async () => {
    const newDireccion = {
      calle: 'Calle Piola',
      altura: 7632,
      ciudad: 'Medellin'
    };

    const response = await request(app).post('/api/direccion/45678910').send(newDireccion);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Direccion created succesfully');
    expect(response.body).toHaveProperty('body');
  });

  it('debería actualizar la informacion de una direccion existente', async () => {
    const newDireccion = {
      calle: 'Calle Nueva',
      altura: '412',
      ciudad: 'Buenos Aires'
    };

    const direccion = await findAllDireccionesByDni('45678910');

    const response = await request(app).put(`/api/direccion/${direccion[0].id}`).send(newDireccion);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Direccion updated succesfully');
    expect(response.body).toHaveProperty('body');
    expect(direccion[0].calle).not.toEqual(newDireccion.calle);
    expect(direccion[0].altura).not.toEqual(newDireccion.altura);
    expect(direccion[0].ciudad).not.toEqual(newDireccion.ciudad);
    expect(direccion[0].personadni).toEqual(45678910);
  });

  it('debería borrar una direccion existente', async () => {

    const direccion = await findAllDireccionesByDni('45678910');

    const response = await request(app).delete(`/api/direccion/${direccion[0].id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Direccion deleted succesfully');
  });

});
