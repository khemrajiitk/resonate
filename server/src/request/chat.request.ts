import { z } from 'zod';
import { createAppointmentSchema, updateAppointmentSchema } from './appointment.request';
import { objectIdSchema } from '../utils/common-schema';

const miniUserSchema = z.object({
    id: z.string(),
    name: z.string(),
});

export const messageSchema = z.object({
    content: z.string(),
    intent: z.string().optional(),
    data: z.any().optional(),
  });

export const createChatSchema = z.object({
    user: miniUserSchema,
    userType: z.enum(['AI', 'user']),
    message: messageSchema,
});

export const getChatsParamSchema = z.object({
    userId: objectIdSchema,
});

export type CreateChatRequest = z.infer<typeof createChatSchema>;
