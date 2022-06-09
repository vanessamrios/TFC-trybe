import { NextFunction, Request, Response } from 'express';
import * as jwtGenerator from '../helpers/jwtGenerator';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    jwtGenerator.verify(authorization);
  } catch (error) {
    if (error instanceof Error && error.name.includes('Token')) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  }
  return next();
};

export default authMiddleware;
