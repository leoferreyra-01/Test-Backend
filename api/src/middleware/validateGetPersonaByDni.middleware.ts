import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { regexOnlyNumber, yupValidate } from './helper';


const getPersonasByDniSchema = yup.object({
  params: yup.object({
    dni:  yup.string().min(7).max(8).matches(regexOnlyNumber, 'query.dni must be a number')
  })
});

export const validateGetPersonasByDni = async (req: Request, res: Response, next: NextFunction) => {
  return yupValidate(req, res, next, getPersonasByDniSchema);
};