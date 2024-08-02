import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { regexOnlyNumber, yupValidate } from './helper';


const createDireccionSchema = yup.object({
  body: yup.object({
    calle:  yup.string().required().min(2),
    altura: yup.string().required().min(1).matches(regexOnlyNumber, 'query.altura must be a number'),
    ciudad: yup.string().required().min(2),
    personadni: yup.string().required().min(7).max(8).matches(regexOnlyNumber, 'query.personadni must be a number')
  })
});

export const validatePostDireccion = async (req: Request, res: Response, next: NextFunction) => {
  return yupValidate(req, res, next, createDireccionSchema);
};