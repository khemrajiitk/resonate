import { Router } from 'express';
import { validateRequest } from '../middlewares/validation.middleware';
import * as authController from  '../controllers/auth.controller';
import { ValidationSource } from '../utils/common-schema';
import { loginSchema, signupSchema } from '../request/auth.request';

const router = Router();

router.post(
  '/signup',
  validateRequest(signupSchema, ValidationSource.BODY),
  authController.signup
);

router.post(
  '/login',
  validateRequest(loginSchema, ValidationSource.BODY),
  authController.login
);

export default router;
