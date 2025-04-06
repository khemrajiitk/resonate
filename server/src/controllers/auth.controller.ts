import { Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { CustomRequest } from '../utils/custom.request';

export const signup = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    req.logger?.info({ message: 'Signup request received' });
    const user = await authService.signup(req.body);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    req.logger?.info({ message: 'Login request received' });
    const data = await authService.login(req.body);
    res.status(200).json({ ...data });
  } catch (error) {
    next(error);
  }
};
