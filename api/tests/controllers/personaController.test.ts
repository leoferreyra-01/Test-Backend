import request from 'supertest';
import { default as app } from '../../src/app';

describe('Persona Controller', () => {

  it('debería listar todas las personas con sus direcciones', async () => {
    const response = await request(app).get('/api/personas');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('debería filtrar personas por dni, edad y/o nombre', async () => {
    const responsedni = await request(app).get('/api/personas?dni=0');
    expect(responsedni.status).toBe(200);
    expect(responsedni.body).toBeInstanceOf(Array);
    const responsenombre = await request(app).get('/api/personas?nombre=juan');
    expect(responsenombre.status).toBe(200);
    expect(responsenombre.body).toBeInstanceOf(Array);
    const responseedad = await request(app).get('/api/personas?edad=28');
    expect(responseedad.status).toBe(200);
    expect(responseedad.body).toBeInstanceOf(Array);
  });

  it('debería mostrar la persona segun el dni pasado por paramtero', async () => {
    const response = await request(app).get('/api/personas/12345678');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('debería crear una nueva persona', async () => {
    const newPersona = {
      dni: '45678912',
      nombre: 'Pedro',
      apellido: 'Sanches',
      edad: 48,
      foto: 'https://foto4.jpg'
    };

    const response = await request(app).post('/api/personas').send(newPersona);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Person created succesfully');
    expect(response.body).toHaveProperty('body', newPersona);
  });

  it('debería actualizar la informacion de una persona existente', async () => {
    const personaActual = {
      nombre: 'Nicolas',
      apellido: 'Gonzales',
      edad: '38',
      foto: 'https://fotoNueva.jpg'
    };
    const personaActualConDni = {
      dni: '45678912',
      nombre: 'Nicolas',
      apellido: 'Gonzales',
      edad: '38',
      foto: 'https://fotoNueva.jpg'
    };
    const personaVieja = await request(app).get('/api/personas/45678912');
    const response = await request(app).put('/api/personas/45678912').send(personaActual);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Person updated succesfully');
    expect(response.body).toHaveProperty('body', personaActualConDni);
    expect(personaVieja.body.nombre).not.toEqual(personaActual.nombre);
    expect(personaVieja.body.apellido).not.toEqual(personaActual.apellido);
    expect(personaVieja.body.edad).not.toEqual(personaActual.edad);
    expect(personaVieja.body.foto).not.toEqual(personaActual.foto);
  });

  it('debería borrar una persona existente', async () => {

    const response = await request(app).delete('/api/personas/45678912');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Person deleted succesfully');
  });

  it('debería exportar las personas a un archivo CSV', async () => {
    const response = await request(app).get('/api/personas/exportar');
    expect(response.status).toBe(200);
    expect(response.header['content-type']).toBe('text/csv; charset=utf-8');
  });
});
