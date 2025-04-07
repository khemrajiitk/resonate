import { z } from 'zod';
import { createAppointmentSchema, updateAppointmentSchema } from './appointment.request';
import { objectIdSchema } from '../utils/common-schema';

const miniUserSchema = z.object({
    id: z.string(),
    name: z.string(),
});

const messageSchema = z.object({
    content: z.string(),
    data: z.object({
        appointment: createAppointmentSchema.optional(),
        updateAppointment: updateAppointmentSchema.optional(),
    }).optional(),
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
