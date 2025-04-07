import * as ChatRepo from '../repos/chat.repo';
import { Chat } from '../models/chat.model';
import { CreateChatRequest } from '../request/chat.request';
import { generateAIResponse } from './ai.service';
import { findUserById } from '../repos/user.repo';
import * as SlotRepo from '../repos/slot.repo';
import { getAppointments } from './appointment.service';

export const createChat = async (data: CreateChatRequest): Promise<Chat[]> => {
    const newChat = await ChatRepo.createChat(data);

    const [user, slots, appointments, chats] = await Promise.all([
        findUserById(newChat.user.id),
        SlotRepo.getAllSlots(),
        getAppointments(newChat.user.id),
        ChatRepo.getChatsByUserId(newChat.user.id),
    ]);

    const message = await generateAIResponse(chats, slots, appointments, user);

    const aiChat = await ChatRepo.createChat({
        user: newChat.user,
        userType: 'AI',
        message,
    });

    chats.push(aiChat);

    return chats;
};


export const getUserChats = async (userId: string): Promise<Chat[]> => {
    return await ChatRepo.getChatsByUserId(userId);
};
