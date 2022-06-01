import { NextFunction, Request, Response } from 'express';

const message = 'All fields must be filled';

const validateEmailNotEmpty = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (email === undefined) {
    return res.status(400).send({ message });
  }
  if (email.length === 0) {
    return res.status(400).send({ message });
  }
  return next();
};

const validatePasswordNotEmpty = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (password === undefined) {
    return res.status(400).send({ message });
  }
  if (password.length === 0) {
    return res.status(400).send({ message });
  }
  return next();
};

export {
  validateEmailNotEmpty,
  validatePasswordNotEmpty,
};
