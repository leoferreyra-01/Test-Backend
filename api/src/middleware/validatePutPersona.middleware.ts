import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { regexOnlyNumber, yupValidate } from './helper';


const updatePersonaSchema = yup.object({
  params: yup.object({
    dni:  yup.string().required().min(7).max(8).matches(regexOnlyNumber, 'query.dni must be a number')
  }),
  body: yup.object({
    dni: yup.string().test('is-empty', 'body.dni cannot be changed', value => !value),
    nombre: yup.string().min(2),
    apellido: yup.string().min(2),
    edad: yup.string().min(1).max(2).matches(regexOnlyNumber, 'query.edad must be a number'),
    foto: yup.string().min(2)
  })
});

export const validatePutPersonas = async (req: Request, res: Response, next: NextFunction) => {
  return yupValidate(req, res, next, updatePersonaSchema);
};