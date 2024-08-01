import { Request, Response } from 'express';
import { PersonaInfo, Persona } from '../models/persona';
import { asociarNuevaDireccion, updateDireccionActual, deleteDireccionById} from '../services/direccion.service';
import { Direccion, DireccionInfo } from '../models/direccion';

export const createDireccion = async (req: Request, res: Response) => {
  try {

    const { dni } = req.params;
    
    const {
      calle, 
      altura, 
      ciudad
    } = req.body;

    if (dni.length > 8 || dni.length < 7){
      return res.status(400).send('Invalid dni');
    }

    const dniNumber = Number(dni);
    const alturaNumber = Number(altura);

    if (isNaN(dniNumber)) {
      return res.status(400).send('Invalid dni');
    }

    if (isNaN(alturaNumber)) {
      return res.status(400).send('Invalid edad');
    }

    const direccion : DireccionInfo = {
      calle: calle as string,
      altura: alturaNumber,
      ciudad: ciudad as string,
      personadni: dniNumber,
    };

    const resultado = await asociarNuevaDireccion(direccion);

    return res.status(201).json(direccion);
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

    if (personadni.length)  {
      return res.status(400).json('Cannot change the dni of Direccion')
    }
    const alturaNumber = Number(altura);
    const dniNumber = Number(personadni);
    const idNumber = Number(id);
    if (altura?.length){
      if (isNaN(alturaNumber)) {
        return res.status(400).send('Invalid edad');
      }
    }
    if (alturaNumber < 0 || alturaNumber > 120) {
      return res.status(400).send('Invalid age');
    }

    if (isNaN(idNumber)) {
      return res.status(400).send('Invalid id');
    }

    const direccionActual : Direccion = {
      id: idNumber,
      calle: calle as string,
      altura: alturaNumber,
      ciudad: ciudad as string,
      personadni: dniNumber,
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

    if (id.length > 8 || id.length < 7){
      return res.status(400).send('Invalid id');
    }

    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      return res.status(400).send('Invalid id');
    }

    const persona = await deleteDireccionById(idNumber);

    return res.status(200).json(persona);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};