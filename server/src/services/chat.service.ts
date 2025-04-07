import * as ChatRepo from '../repos/chat.repo';
import { Chat } from '../models/chat.model';
import { CreateChatRequest } from '../request/chat.request';

export const createChat = async (data: CreateChatRequest): Promise<Chat> => {
  const newChat = ChatRepo.createChat(data);

  //TODO: ask to ai here
  return newChat;
};


export const getUserChats = async (userId: string): Promise<Chat[]> => {
  return ChatRepo.getChatsByUserId(userId);
};
