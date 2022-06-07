import { Request, Response } from 'express';
import Teams from '../database/models/Teams';
// import { compare } from 'bcryptjs';
// import Users from '../database/models/Users';
// import * as jwtGenerator from '../helpers/jwtGenerator';

class TeamsController {
  public getAll = async (req: Request, res: Response) => {
    const teams = await Teams.findAll();

    return res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await Teams.findOne({ where: { id } });
    return res.status(200).json(team);
  };
}

export default TeamsController;
