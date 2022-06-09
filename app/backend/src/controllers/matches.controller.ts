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
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(401).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }

    const createdMatch = await Matches.create(match);
    return res.status(201).json(createdMatch);
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;

    await Matches.update({ inProgress: false }, { where: { id } });

    return res.status(200).json({ message: 'Finished' });
  };
}

export default MatchesController;
