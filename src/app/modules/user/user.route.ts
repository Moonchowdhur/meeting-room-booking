import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { UserValidation } from './user.validaton';
import { UserControllers } from './user.controller';
import { authValidation } from '../auth/auth.validation';
import { authController } from '../auth/auth.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser,
);

//login
router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser,
);

export const userRoute = router;
