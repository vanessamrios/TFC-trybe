import { Request, Response } from 'express';
import { compare } from 'bcrypt';
import Users from '../database/models/Users';
import * as jwtGenerator from '../helpers/jwtGenerator';

class LoginController {
  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email } });

    if (!user) return res.status(401).json({ message: 'Incorrect email or password' });

    const validPassword = await compare(password, user.password);

    if (!validPassword) return res.status(401).json({ error: 'Invalid password' });

    const token = jwtGenerator.generate({ id: user.id, email });

    return res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      token,
    });
  };

  public validate = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    try {
      const decoded = jwtGenerator.verify(authorization);
      const { email } = decoded.data;
      const user = await Users.findOne({ where: { email } });
      if (!user) return res.status(401).json({ message: 'Incorrect email or password' });

      return res.status(200).send(user.role);
    } catch (error) {
      if (error instanceof Error && error.name.includes('Token')) {
        return res.status(401).json({ message: 'Expired or invalid token' });
      }
    }
  };
}

export default LoginController;
