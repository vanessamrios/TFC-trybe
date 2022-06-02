import { Router } from 'express';
import { validateEmailNotEmpty, validatePasswordNotEmpty } from '../middlewares/login.middleware';
import LoginController from '../controllers/login.controller';

const router = Router();

const loginController = new LoginController();

router.post('/login', validateEmailNotEmpty, validatePasswordNotEmpty, loginController.login);
router.get('/login/validate', loginController.validate);

export default router;
