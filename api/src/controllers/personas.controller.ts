import { Request, Response } from 'express';

export const getPersonas = async (req: Request, res: Response) => {
  try {
    res.status(200).send({'personas': 'juan'});
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
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
