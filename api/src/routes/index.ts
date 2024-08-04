import express, { Request, Response } from 'express';

import {getPersonas, getPersonaByDni, createPersona, updatePersona, deletePersona, getPersonasExportar} from '../controllers/personas.controller';
import {createDireccion, updateDireccion, deleteDireccion} from '../controllers/direccion.controller';
import { validateGetPersonas } from '../middleware/validateGetPersonas.middleware';
import { validateGetPersonasByDni } from '../middleware/validateGetPersonaByDni.middleware';
import { validatePostPersonas } from '../middleware/validatePostPersona.middleware';
import { validatePutPersonas } from '../middleware/validatePutPersona.middleware';
import { validateDeletePersonas } from '../middleware/validateDeletePersona.middleware';
import { validatePostDireccion } from '../middleware/validatePostDireccion.middleware';
import { validatePutDireccion } from '../middleware/validatePutDireccion.middleware';
import { validateDeleteDireccion } from '../middleware/validateDeleteDireccion.middleware';

const router = express.Router();

export const routes = (app : any) => {
  router.get('/api/personas', validateGetPersonas, (req: Request, res: Response) => getPersonas(req, res))

  // Para el export de las personas en un archivo csv se decidio realizar el export con la primer direccion, si es que tiene mas de una.
  router.get('/api/personas/exportar', (req: Request, res: Response) => getPersonasExportar(req, res))

  router.get('/api/personas/:dni', validateGetPersonasByDni, (req: Request, res: Response) => getPersonaByDni(req, res))

  router.post('/api/personas/', validatePostPersonas, (req: Request, res: Response) => createPersona(req, res))

  router.put('/api/personas/:dni', validatePutPersonas, (req: Request, res: Response) => updatePersona(req, res))

  router.delete('/api/personas/:dni', validateDeletePersonas, (req: Request, res: Response) => deletePersona(req, res))

  router.post('/api/direccion/:personadni', validatePostDireccion, (req: Request, res: Response) => createDireccion(req, res))

  router.put('/api/direccion/:id', validatePutDireccion, (req: Request, res: Response) => updateDireccion(req, res))

  router.delete('/api/direccion/:id', validateDeleteDireccion, (req: Request, res: Response) => deleteDireccion(req, res))

  app.use(router);
}