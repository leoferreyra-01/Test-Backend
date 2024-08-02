import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { regexOnlyNumber, yupValidate } from './helper';


const deleteDireccionSchema = yup.object({
  params: yup.object({
    id:  yup.string().required().matches(regexOnlyNumber, 'query.id must be a number')
  })
});

export const validateDeleteDireccion = async (req: Request, res: Response, next: NextFunction) => {
  return yupValidate(req, res, next, deleteDireccionSchema);
};