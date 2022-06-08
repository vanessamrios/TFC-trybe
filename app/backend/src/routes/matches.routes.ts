import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const router = Router();

const matchesController = new MatchesController();

router.get('/matches', matchesController.getAll);

export default router;