import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { regexOnlyChar, regexOnlyNumber, yupValidate } from './helper';


const createPersonaSchema = yup.object({
  body: yup.object({
    dni:  yup.string().required().min(7).max(8).matches(regexOnlyNumber, 'body.dni must be a number'),
    nombre: yup.string().required().min(2).matches(regexOnlyChar, 'body.nombre must be a string whitout numbers'),
    apellido: yup.string().required().min(2).matches(regexOnlyChar, 'body.apellido must be a string whitout numbers'),
    edad: yup.string().required().min(1).max(3).matches(regexOnlyNumber, 'body.edad must be a number'),
    foto: yup.string().url()
  })
});

export const validatePostPersonas = async (req: Request, res: Response, next: NextFunction) => {
  return yupValidate(req, res, next, createPersonaSchema);
};