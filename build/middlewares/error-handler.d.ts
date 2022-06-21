import { NextFunction, Request, Response } from "express";
interface FormattedErrorResponse {
    errors: FormattedError[];
}
export interface FormattedError {
    message: string;
    field?: string;
}
export declare const errorHandler: (err: Error, req: Request, res: Response<FormattedErrorResponse>, next: NextFunction) => Response<FormattedErrorResponse, Record<string, any>>;
export {};
