import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

interface UserPayload {
  id: string
  email: string
}

// Augment express's Request interface
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next()
  }

  let payload: UserPayload
  try {
    payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
  } catch (e) {
    return next()
  }

  req.currentUser = payload

  return next()
}
