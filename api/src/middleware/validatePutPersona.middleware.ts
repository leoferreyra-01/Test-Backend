import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { regexOnlyChar, regexOnlyNumber, yupValidate } from './helper';


const updatePersonaSchema = yup.object({
  params: yup.object({
    dni:  yup.string().required().min(7).max(8).matches(regexOnlyNumber, 'params.dni must be a number')
  }),
  body: yup.object({
    dni: yup.string().test('is-empty', 'body.dni cannot be changed', value => !value),
    nombre: yup.string().min(2).matches(regexOnlyChar, 'body.nombre must be a string whitout numbers'),
    apellido: yup.string().min(2).matches(regexOnlyChar, 'body.apellido must be a string whitout numbers'),
    edad: yup.string().min(1).max(3).matches(regexOnlyNumber, 'body.edad must be a number'),
    foto: yup.string().min(2)
  })
});

export const validatePutPersonas = async (req: Request, res: Response, next: NextFunction) => {
  return yupValidate(req, res, next, updatePersonaSchema);
};