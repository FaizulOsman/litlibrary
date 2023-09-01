import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = Router();

// Routes
router.post(
  '/signup',
  validateRequest(AuthValidation.signUp),
  AuthController.signUp
);

router.post(
  '/signin',
  validateRequest(AuthValidation.login),
  AuthController.login
);

export const AuthRoutes = router;
