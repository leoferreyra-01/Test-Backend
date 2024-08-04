import { Request, Response } from 'express';
import { PersonaInfo, Persona } from '../models/persona';
import { asociarNuevaDireccion, updateDireccionActual, deleteDireccionById} from '../services/direccion.service';
import { Direccion, DireccionInfo } from '../models/direccion';

export const createDireccion = async (req: Request, res: Response) => {
  try {

    const { personadni } = req.params;
    
    const {
      calle, 
      altura, 
      ciudad
    } = req.body;

    const direccion : DireccionInfo = {
      calle: calle as string,
      altura: altura,
      ciudad: ciudad as string,
      personadni: personadni,
    };

    const resultado : Direccion = await asociarNuevaDireccion(direccion);

    return res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

export const updateDireccion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      calle, 
      altura, 
      ciudad,
      personadni
    } = req.body;

    const direccionActual : Direccion = {
      id: Number(id),
      calle: calle as string,
      altura: altura,
      ciudad: ciudad as string,
      personadni: personadni,
    }

    const resultado = await updateDireccionActual(direccionActual)

    return res.status(200).json(direccionActual);
  
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

export const deleteDireccion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const persona = await deleteDireccionById(id);

    return res.status(200).json(persona);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};