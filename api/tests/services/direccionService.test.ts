import { findAllDireccionesByDni, asociarNuevaDireccion, updateDireccionActual, deleteDireccionById} from '../../src/services/direccion.service';
import { createNuevaPersona, deletePersonaByDni} from '../../src/services/persona.service';
import { Persona } from '../../src/models/persona';
import { DireccionInfo } from '../../src/models/direccion';

describe('Direccion Service', () => {

  beforeAll(async () => {
    const newPersona : Persona = {
      dni: '45678910',
      nombre: 'Pedro',
      apellido: 'Sanches',
      edad: '48',
      foto: 'https://foto4.jpg'
    };
    await createNuevaPersona(newPersona);
  });

  afterAll(async () => {
    const direccion = await findAllDireccionesByDni('45678910');
    await deleteDireccionById(direccion[0].id);
    await deletePersonaByDni('45678910');
  });

  it('debería listar todas las direcciones de una persona', async () => {
    const response = await findAllDireccionesByDni('12345678');
    expect(response).toBeInstanceOf(Array);
    expect(response.length).toBeGreaterThan(0);
  });

  it('debería crear una nueva direccion', async () => {
    const newDireccion : DireccionInfo = {
      calle: 'Calle Piola',
      altura: '7632',
      ciudad: 'Medellin',
      personadni: '45678910'
    };

    const response = await asociarNuevaDireccion(newDireccion);
    expect(response).toBeInstanceOf(Object);
  });

  it('debería actualizar la informacion de una persona existente', async () => {
    const direccion = await findAllDireccionesByDni('45678910');
    const newDireccion : DireccionInfo = {
      id: direccion[0].id,
      calle: 'Calle Nueva',
      altura: '412',
      ciudad: 'Buenos Aires',
      personadni: '45678910'
    };

    const response = await updateDireccionActual(newDireccion);
    expect(response).toStrictEqual(newDireccion);
    expect(direccion[0].id).toEqual(newDireccion.id);
    expect(direccion[0].calle).not.toEqual(newDireccion.calle);
    expect(direccion[0].altura).not.toEqual(newDireccion.altura);
    expect(direccion[0].ciudad).not.toEqual(newDireccion.ciudad);
    expect(`${direccion[0].personadni}`).toEqual(newDireccion.personadni);
  });
});
