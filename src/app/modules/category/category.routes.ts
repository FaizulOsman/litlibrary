import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CategoryController } from './category.controller';

const router = Router();

// Routes
router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.insertIntoDB
);
router.get('/', CategoryController.getAllFromDB);
router.get('/:id', CategoryController.getByIdFromDB);
router.patch('/:id', CategoryController.updateIntoDB);
router.delete('/:id', CategoryController.deleteFromDB);

export const CategoryRoutes = router;
