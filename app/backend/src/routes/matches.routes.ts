import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import MatchesController from '../controllers/matches.controller';

const router = Router();

const matchesController = new MatchesController();

router.get('/matches', matchesController.getAll);
router.post('/matches', authMiddleware, matchesController.create);
router.patch('/matches/:id/finish', matchesController.update);

export default router;
