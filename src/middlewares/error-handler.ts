import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

interface FormattedErrorResponse {
  errors: FormattedError[]
}

export interface FormattedError {
  message: string
  field?: string
}

export const errorHandler = (err: Error, req: Request, res: Response<FormattedErrorResponse>, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serialiseErrors() })
  }
  
  console.log('Something went wrong', err)
  return res.status(500).send({ errors: [{message: 'Something went wrong' }]})
}
