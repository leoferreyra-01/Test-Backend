import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { regexOnlyChar, regexOnlyNumber, yupValidate } from './helper';


const getPersonasSchema = yup.object({
  query: yup.object({
    dni:  yup.string().min(1).max(8).matches(regexOnlyNumber, 'query.dni must be a number'),
    nombre:  yup.string().min(2).matches(regexOnlyChar, 'query.nombre must be a string whitout numbers'),
    edad: yup.string().min(1).max(3).matches(regexOnlyNumber, 'query.edad must be a number'),
  })
});

export const validateGetPersonas = async (req: Request, res: Response, next: NextFunction) => {
  return yupValidate(req, res, next, getPersonasSchema);
};

