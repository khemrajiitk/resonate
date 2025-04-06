import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CustomError } from '../utils/custom.error';
import * as userRepo from '../repos/user.repo';
import { LoginReq, SignupReq } from '../request/auth.request';
import { User } from '../models/user.model';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const signup = async (signUpReq: SignupReq) => {
  const existing = await userRepo.findUserByEmail(signUpReq.email);
  if (existing) throw new CustomError('Email already in use', 400);

  const hashedPassword = await bcrypt.hash(signUpReq.password, SALT_ROUNDS);

  const createdUser = await userRepo.createUser({
    ...signUpReq,
    password: hashedPassword
  } as User);

  return {
    id: createdUser._id,
    email: createdUser.email,
    name: createdUser.name,
  };
};

export const login = async (loginReq: LoginReq) => {
  const user = await userRepo.findUserByEmail(loginReq.email);
  if (!user) throw new CustomError('Invalid credentials', 401);

  const match = await bcrypt.compare(loginReq.password, user.password);
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
