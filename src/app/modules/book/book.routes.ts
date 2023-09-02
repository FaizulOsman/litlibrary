import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookController } from './book.controller';

const router = Router();

// Routes
router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.insertIntoDB
);
router.get('/', BookController.getAllFromDB);
router.get('/:id', BookController.getByIdFromDB);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.updateIntoDB);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteFromDB);

export const BookRoutes = router;