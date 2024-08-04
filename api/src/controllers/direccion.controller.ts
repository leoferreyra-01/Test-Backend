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

    return res.status(201).json({message: 'Direccion created succesfully', body: resultado});
  } catch (error) {
    console.error(error);
    return res.status(500).json({errors : [{ element: error , message: 'Error creating direccion'}]});
  }
};

export const updateDireccion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      calle, 
      altura, 
      ciudad,
    } = req.body;

    const direccionActual : DireccionInfo = {
      id: Number(id),
      calle: calle as string,
      altura: altura,
      ciudad: ciudad as string
    }

    const resultado = await updateDireccionActual(direccionActual)

    return res.status(200).json({message: 'Direccion updated succesfully', body: resultado});
  
  } catch (error) {
    console.error(error);
    return res.status(500).json({errors : [{ element: error , message: 'Error editing direccion'}]});
  }
};

export const deleteDireccion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const resultado = await deleteDireccionById(id);

    return res.status(200).json({message: 'Direccion deleted succesfully', body: resultado});

  } catch (error) {
    console.error(error);
    return res.status(500).json({errors : [{ element: error , message: 'Error deleting direccion'}]});
  }
};