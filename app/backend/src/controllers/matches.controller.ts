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
    return res.status(201).json(createdMatch);
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;

    // const match = await Matches.findOne({ where: { id } });
    await Matches.update({ inProgress: false }, { where: { id } });

    return res.status(200).json({ message: 'Finished' });
  };
}

export default MatchesController;
