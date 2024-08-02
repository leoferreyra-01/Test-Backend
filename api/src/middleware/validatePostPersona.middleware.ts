import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { regexOnlyNumber, yupValidate } from './helper';


const createPersonaSchema = yup.object({
  body: yup.object({
    dni:  yup.string().required().min(7).max(8).matches(regexOnlyNumber, 'query.dni must be a number'),
    nombre: yup.string().required().min(2),
    apellido: yup.string().required().min(2),
    edad: yup.string().required().min(1).max(2).matches(regexOnlyNumber, 'query.edad must be a number'),
    foto: yup.string()
  })
});

export const validatePostPersonas = async (req: Request, res: Response, next: NextFunction) => {
  return yupValidate(req, res, next, createPersonaSchema);
};