import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const router = Router();

const teamsController = new TeamsController();

router.get('/teams', teamsController.getAll);
router.get('/teams/:id', teamsController.getById);

export default router;
