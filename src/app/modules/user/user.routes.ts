import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = Router();

// Routes
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllFromDB);
router.get('/profile', UserController.getMyProfile);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getByIdFromDB);
router.patch('/:id', UserController.updateIntoDB);
router.delete('/:id', UserController.deleteFromDB);

export const UserRoutes = router;
