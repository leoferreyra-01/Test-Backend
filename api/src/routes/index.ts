import express, { Request, Response } from 'express';

import {getPersonas, getPersonaById, createPersona, updatePersona, deletePersona} from '../controllers/personas.controller';
import {createDireccion, updateDireccion, deleteDireccion} from '../controllers/direccion.controller';

const router = express.Router();

export const routes = (app : any) => {
  router.get('/api/personas', (req: Request, res: Response) => getPersonas(req, res))

  router.get('/api/personas/:dni', (req: Request, res: Response) => getPersonaById(req, res))

  router.post('/api/personas/', (req: Request, res: Response) => createPersona(req, res))

  router.put('/api/personas/:dni', (req: Request, res: Response) => updatePersona(req, res))

  router.delete('/api/personas/:dni', (req: Request, res: Response) => deletePersona(req, res))

  router.post('/api/direccion/:dni', (req: Request, res: Response) => createDireccion(req, res))

  router.put('/api/direccion/:id', (req: Request, res: Response) => updateDireccion(req, res))

  router.delete('/api/direccion/:dni', (req: Request, res: Response) => deleteDireccion(req, res))

  app.use(router);
}