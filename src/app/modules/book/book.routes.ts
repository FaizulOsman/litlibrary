import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = Router();

// Routes
router.post(
  '/create-book',
  validateRequest(BookValidation.create),
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.insertIntoDB
);

router.get('/:categoryId/category', BookController.getBooksByCategory);

router.get('/', BookController.getAllFromDB);

router.get('/:id', BookController.getByIdFromDB);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.update),
  BookController.updateIntoDB
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteFromDB);

export const BookRoutes = router;
