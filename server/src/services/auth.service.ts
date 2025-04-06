// src/services/auth.service.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CustomError } from '../utils/custom.error';
import * as userRepo from '../repos/user.repo';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const signup = async (data: { email: string; password: string; name?: string }) => {
  const existing = await userRepo.findUserByEmail(data.email);
  if (existing) throw new CustomError('Email already in use', 400);

  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const createdUser = await userRepo.createUser({
    email: data.email,
    password: hashedPassword,
    name: data.name,
  });

  return {
    id: createdUser._id,
    email: createdUser.email,
    name: createdUser.name,
  };
};

export const login = async (data: { email: string; password: string }) => {
  const user = await userRepo.findUserByEmail(data.email);
  if (!user) throw new CustomError('Invalid credentials', 401);

  const match = await bcrypt.compare(data.password, user.password);
  if (!match) throw new CustomError('Invalid credentials', 401);

  const token = jwt.sign({ id: user._id?.toString(), email: user.email }, JWT_SECRET, {
    expiresIn: '1d',
  });

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  };
};
