import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

const jwtConfig = {
  expiresIn: '1d',
};

const SECRET = fs
  .readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' })
  .trim();

export const generate = (payload: UserToken) => jwt.sign({ data: payload }, SECRET, jwtConfig);

export const verify = (token: string) => jwt.verify(token, SECRET) as Token;

type Token = {
  data: UserToken
};

type UserToken = {
  id: number,
  email: string,
};
