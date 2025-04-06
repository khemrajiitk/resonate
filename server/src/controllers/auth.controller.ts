import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await authService.login(req.body);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
