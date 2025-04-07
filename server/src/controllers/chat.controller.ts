import { Response, NextFunction } from 'express';
import * as ChatService from '../services/chat.service';
import { CustomRequest } from '../utils/custom.request';

export const createChat = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    req.logger?.info({ message: 'Creating chat' });
    const chat = await ChatService.createChat(req.body);
    res.status(201).json({ chat });
  } catch (error) {
    next(error);
  }
};

export const getChats = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    const chats = await ChatService.getUserChats(userId);
    res.status(200).json({ chats });
  } catch (error) {
    next(error);
  }
};
