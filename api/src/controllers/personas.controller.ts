import { Request, Response } from 'express';
import { PersonaInfo, Persona, PersonaConDirecciones } from '../models/persona';
import { findAllPersonas, findPersonaByDni, createNuevaPersona, updatePersonaActual, deletePersonaByDni, exportPersonas} from '../services/persona.service';

export const getPersonas = async (req: Request, res: Response) => {
  try {
    const {
      dni, 
      nombre, 
      edad
    } = req.query;

    const search : PersonaInfo = {
      dni: dni as string,
      nombre: nombre as string,
      edad: edad as string,
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

export const getPersonaByDni = async (req: Request, res: Response) => {
  try{
    const { dni } = req.params;

    const persona = await findPersonaByDni( dni );

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

    const persona : Persona = {
      dni: dni,
      nombre: nombre as string,
      apellido: apellido as string,
      edad: edad,
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

    const personaActual : Persona = {
      dni: dni as string,
      nombre: nombre as string,
      apellido: apellido as string,
      edad: edad as string,
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

    const persona = await deletePersonaByDni(dni);

    return res.status(200).json(persona);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

export const getPersonasExportar = async (req: Request, res: Response) => {
  try{
    const {
      dni, 
      nombre, 
      edad
    } = req.query;

    const search : PersonaInfo = {
      dni: dni as string,
      nombre: nombre as string,
      edad: edad as string,
    }
    const personas : PersonaConDirecciones[] = await findAllPersonas(search);
    const exportacion = await exportPersonas(personas);

    return res.status(200).json(exportacion);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};