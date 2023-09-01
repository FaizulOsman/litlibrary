import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();

// Routes
router.post('/signup', AuthController.insertIntoDB);

export const AuthRoutes = router;
