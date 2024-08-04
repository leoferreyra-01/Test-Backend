import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { regexOnlyNumber, yupValidate } from './helper';


const updateDireccionSchema = yup.object({
  params: yup.object({
    id:  yup.string().required().matches(regexOnlyNumber, 'params.id must be a number')
  }),
  body: yup.object({
    id: yup.string().test('is-empty', 'body.id cannot be changed', value => !value),
    calle:  yup.string().min(2),
    altura: yup.string().min(1).matches(regexOnlyNumber, 'body.altura must be a number'),
    ciudad: yup.string().min(2),
    personadni: yup.string().test('is-empty', 'body.personadni cannot be changed', value => !value)
  })
});

export const validatePutDireccion = async (req: Request, res: Response, next: NextFunction) => {
  return yupValidate(req, res, next, updateDireccionSchema);
};