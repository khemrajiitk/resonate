import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema } from 'zod';
import { ValidationSource } from '../utils/common-schema';

export const validateRequest = (
  schema: ZodSchema,
  source: ValidationSource = ValidationSource.BODY
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const dataToValidate = 
        source === ValidationSource.BODY ? req.body :
        source === ValidationSource.PARAMS ? req.params :
        req.query;

      const result = schema.safeParse(dataToValidate);

      if (!result.success) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: result.error.format(),
        });
        return;
      }

      // Override validated fields
      if (source === ValidationSource.BODY) req.body = result.data;
      if (source === ValidationSource.PARAMS) req.params = result.data;
      if (source === ValidationSource.QUERY) req.query = result.data;

      next();
    } catch (error) {
      next(error);
    }
  };
};
