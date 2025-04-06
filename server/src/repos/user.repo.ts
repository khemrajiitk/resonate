// src/repos/user.repo.ts
import { ObjectId } from 'mongodb';
import { connectDB } from '../config/db';
import { User } from '../models/user';

const COLLECTION_NAME = 'users';

export const createUser = async (user: User): Promise<User> => {
  const db = await connectDB();
  const result = await db.collection<User>(COLLECTION_NAME).insertOne(user);
  return { ...user, _id: result.insertedId };
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const db = await connectDB();
  return db.collection<User>(COLLECTION_NAME).findOne({ email });
};

export const findUserById = async (id: string): Promise<User | null> => {
  const db = await connectDB();
  return db.collection<User>(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
};
