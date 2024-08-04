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
    return res.status(500).json({errors : [{ element: error , message: 'Error geting persona'}]});
  }
};

export const getPersonaByDni = async (req: Request, res: Response) => {
  try{
    const { dni } = req.params;

    const persona = await findPersonaByDni( dni );

    if (!persona) {
      return res.status(404).send('Not found');
    }

    return res.status(200).json(persona);

  } catch (error) {
    console.error(error);
    return res.status(500).json({errors : [{ element: error , message: 'Error geting persona by dni'}]});
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

    return res.status(201).json({message: 'Person created succesfully', body: resultado});
  } catch (error) {
    console.error(error);
    return res.status(500).json({errors : [{ element: error , message: 'Error creatng persona'}]});
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

    return res.status(200).json({message: 'Person updated succesfully',body: resultado});
  
  } catch (error) {
    console.error(error);
    return res.status(500).json({errors : [{ element: error , message: 'Error updating persona'}]});
  }
};

export const deletePersona = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;

    await deletePersonaByDni(dni);

    return res.status(200).json({message: 'Person deleted succesfully'});

  } catch (error) {
    console.error(error);
    return res.status(500).json({errors : [{ element: error , message: 'Error deleting persona'}]});
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
    res.header('Content-Type', 'text/csv');
    res.attachment('personas.csv');
    res.status(200).send(exportacion);
  } catch (error) {
    console.error(error);
    return res.status(500).json({errors : [{ element: error , message: 'Error exporting csv'}]});
  }
};