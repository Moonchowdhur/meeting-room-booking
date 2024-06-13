import express from 'express';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';
import { validateRequest } from '../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser,
);

export const authRoutes = router;
