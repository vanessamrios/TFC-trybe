import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

const jwtConfig = {
  expiresIn: '1d',
};

const SECRET = fs
  .readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' })
  .trim();

export default (payload = {}) => jwt.sign({ data: payload }, SECRET, jwtConfig);
