import { connectDB } from '../config/db';
import { Chat } from '../models/chat.model';

const COLLECTION_NAME = 'chats';

export const createChat = async (chat: Chat): Promise<Chat> => {
  const db = await connectDB();
  const result = await db.collection<Chat>(COLLECTION_NAME).insertOne({
    ...chat,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return { ...chat, _id: result.insertedId };
};

export const getChatsByUserId = async (userId: string): Promise<Chat[]> => {
  const db = await connectDB();
  return db.collection<Chat>(COLLECTION_NAME).find({ "user.id": userId }).toArray();
};
