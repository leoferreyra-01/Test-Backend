import { Request, Response } from 'express';
import { PersonaInfo } from '../models/persona';
import { findAllPersonas } from '../services/persona.service';

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
  //Code Here
};

export const createPersona = async (req: Request, res: Response) => {
  //Code Here
};

export const updatePersona = async (req: Request, res: Response) => {
  //Code Here
};

export const deletePersona = async (req: Request, res: Response) => {
  //Code Here
};
