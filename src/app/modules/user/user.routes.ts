import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = Router();

// Routes
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllFromDB);

router.get(
  '/profile',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  UserController.getMyProfile
);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getByIdFromDB);

router.patch(
  '/:id',
  validateRequest(UserValidation.update),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateIntoDB
);

router.delete('/:id', UserController.deleteFromDB);

export const UserRoutes = router;
