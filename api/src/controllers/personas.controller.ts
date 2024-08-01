import { Request, Response } from 'express';
import { PersonaInfo, Persona } from '../models/persona';
import { findAllPersonas, createNuevaPersona, updatePersonaActual, deletePersonaByDni} from '../services/persona.service';

export const getPersonas = async (req: Request, res: Response) => {
  try {
    const {
      dni, 
      nombre, 
      edad
    } = req.query;
    const dniNumber = Number(dni);
    const edadNumber = Number(edad);
    if (dni?.length){
      if (isNaN(dniNumber)) {
        return res.status(400).send('Invalid dni');
      }
    }
    if (edad?.length){
      if (isNaN(edadNumber)) {
        return res.status(400).send('Invalid edad');
      }
    }

    const search : PersonaInfo = {
      dni: dniNumber,
      nombre: nombre as string,
      edad: edadNumber,
    }
    
    const personas = await findAllPersonas(search);

    if (!personas.length) {
      return res.status(404).send('Not found');
    }

    return res.status(200).json(personas);
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

export const getPersonaById = async (req: Request, res: Response) => {
  try{
    const { dni } = req.params;

    if (dni.length > 8 || dni.length < 7){
      return res.status(400).send('Invalid dni');
    }

    const dniNumber = Number(dni);
    if (isNaN(dniNumber)) {
      return res.status(400).send('Invalid dni');
    }

    const persona = await findAllPersonas({ dni: dniNumber });

    if (!persona.length) {
      return res.status(404).send('Not found');
    }

    return res.status(200).json(persona);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

export const createPersona = async (req: Request, res: Response) => {
  try {
    const {
      dni, 
      nombre, 
      apellido, 
      edad, 
      foto
    } = req.body;

    if (dni.length > 8 || dni.length < 7){
      return res.status(400).send('Invalid dni');
    }

    const dniNumber = Number(dni);
    const edadNumber = Number(edad);

    if (isNaN(dniNumber)) {
      return res.status(400).send('Invalid dni');
    }

    if (edad?.length){
      if (isNaN(edadNumber)) {
        return res.status(400).send('Invalid edad');
      }
    }

    if (edadNumber < 0 || edadNumber > 120) {
      return res.status(400).send('Invalid age');
    }

    const persona : Persona = {
      dni: dniNumber,
      nombre: nombre as string,
      apellido: apellido as string,
      edad: edadNumber,
      foto: foto || null,
    };

    const resultado = await createNuevaPersona(persona);

    return res.status(201).json(persona);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

export const updatePersona = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;
    const {
      nombre, 
      apellido, 
      edad, 
      foto
    } = req.body;

    if (dni.length > 8 || dni.length < 7){
      return res.status(400).send('Invalid dni');
    }
    const dniNumber = Number(dni);
    if (isNaN(dniNumber)) {
      return res.status(400).send('Invalid dni');
    }
    const edadNumber = Number(edad);
    if (edad?.length){
      if (isNaN(edadNumber)) {
        return res.status(400).send('Invalid edad');
      }
    }
    if (edadNumber < 0 || edadNumber > 120) {
      return res.status(400).send('Invalid age');
    }

    const personaActual : Persona = {
      dni: dniNumber,
      nombre: nombre as string,
      apellido: apellido as string,
      edad: edadNumber,
      foto: foto || null,
    }

    const resultado = await updatePersonaActual(personaActual)

    return res.status(200).json(personaActual);
  
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

export const deletePersona = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;

    // if (dni.length > 8 || dni.length < 7){
    //   return res.status(400).send('Invalid dni');
    // }

    const dniNumber = Number(dni);
    if (isNaN(dniNumber)) {
      return res.status(400).send('Invalid dni');
    }

    const persona = await deletePersonaByDni(dniNumber);

    return res.status(200).json(persona);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};
