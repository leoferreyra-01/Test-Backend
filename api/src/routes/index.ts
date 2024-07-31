import express, { Request, Response } from 'express';

import {getPersonas, getPersonaById, createPersona, updatePersona, deletePersona} from '../controllers/personas.controller';

const router = express.Router();

export const routes = (app : any) => {
  router.get('/api/personas', (req: Request, res: Response) => getPersonas(req, res))

  router.get('/api/personas/:id', (req: Request, res: Response) => getPersonaById(req, res))

  router.post('/api/personas/', (req: Request, res: Response) => createPersona(req, res))

  router.put('/api/personas/:id', (req: Request, res: Response) => updatePersona(req, res))

  router.delete('/api/personas/:id', (req: Request, res: Response) => deletePersona(req, res))

  app.use(router);
}