import request from 'supertest';
import { default as app } from '../../src/app';
import { findAllPersonas, findPersonaByDni, createNuevaPersona, updatePersonaActual, deletePersonaByDni} from '../../src/services/persona.service';
import { data } from '../datosDePrueba';
import { Persona } from '../../src/models/persona';

describe('Persona Controller', () => {

  afterAll (async() => {
    await deletePersonaByDni('45678912');
  });

  it('debería listar todas las personas con sus direcciones', async () => {
    const response = await findAllPersonas();
    expect(response).toBeInstanceOf(Array);
    expect(response.length).toBeGreaterThan(0);
  });

  it('debería mostrar la persona segun el dni pasado por paramtero', async () => {
    const response = await findPersonaByDni('12345678');
    expect(response).toBeInstanceOf(Object);
  });

  it('debería crear una nueva persona', async () => {
    const newPersona : Persona = {
      dni: '45678912',
      nombre: 'Pedro',
      apellido: 'Sanches',
      edad: '48',
      foto: 'https://foto4.jpg'
    };

    const response = await createNuevaPersona(newPersona);
    expect(response).toStrictEqual(newPersona);
  });

  it('debería actualizar la informacion de una persona existente', async () => {
    const personaActualConDni = {
      dni: '45678912',
      nombre: 'Nicolas',
      apellido: 'Gonzales',
      edad: '38',
      foto: 'https://fotoNueva.jpg'
    };
    const personaVieja = await findPersonaByDni('45678912');
    const response = await updatePersonaActual(personaActualConDni);
    expect(response).toStrictEqual(personaActualConDni);
    expect(personaVieja.nombre).not.toEqual(personaActualConDni.nombre);
    expect(personaVieja.apellido).not.toEqual(personaActualConDni.apellido);
    expect(personaVieja.edad).not.toEqual(personaActualConDni.edad);
    expect(personaVieja.foto).not.toEqual(personaActualConDni.foto);
  });
});
