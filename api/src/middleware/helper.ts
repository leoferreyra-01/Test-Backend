import { Request, Response, NextFunction } from 'express';

export const regexOnlyNumber = /^\d*$/;

export const yupValidate = async (req: Request, res: Response, next: NextFunction, schemaToValidate: any) => {
    try {
      await schemaToValidate.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      }, { abortEarly: false })
      return next();
    } catch (error: any) {
      let { inner: errorList } = error;

      let errors: [];
      errors = errorList.map((err: { path: string; message: string; }) => {
          return {
            element: err.path,
            message: err.message
          }
        }) ;
        return res.status(400).json({ errors });
    }
};