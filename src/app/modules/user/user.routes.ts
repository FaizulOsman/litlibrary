import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

// Routes
router.get('/', UserController.getAllFromDB);
router.get('/profile', UserController.getMyProfile);
router.get('/:id', UserController.getByIdFromDB);
router.patch('/:id', UserController.updateIntoDB);
router.delete('/:id', UserController.deleteFromDB);

export const UserRoutes = router;
