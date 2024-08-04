import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { regexOnlyNumber, yupValidate } from './helper';


const deletePersonaSchema = yup.object({
  params: yup.object({
    dni:  yup.string().required().min(7).max(8).matches(regexOnlyNumber, 'params.dni must be a number')
  })
});

export const validateDeletePersonas = async (req: Request, res: Response, next: NextFunction) => {
  return yupValidate(req, res, next, deletePersonaSchema);
};