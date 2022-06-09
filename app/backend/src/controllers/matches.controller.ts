import { Request, Response } from 'express';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

class MatchesController {
  public getAll = async (req: Request, res: Response) => {
    const matches = await Matches.findAll({
      include: [{
        model: Teams,
        as: 'teamAway',
        attributes: ['teamName'],
      }, {
        model: Teams,
        as: 'teamHome',
        attributes: ['teamName'],
      }],
    });

    return res.status(200).json(matches);
  };

  public create = async (req: Request, res: Response) => {
    const match = req.body;

    const createdMatch = await Matches.create(match);
    res.status(201).json(createdMatch);
  };
}

export default MatchesController;
