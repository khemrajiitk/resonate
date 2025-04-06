import { z } from 'zod';
import { emailSchema, nameSchema, passwordSchema } from '../utils/common-schema';

export const signupSchema = z.object({
    email: emailSchema,
    password: passwordSchema    ,
    name: nameSchema,
    otp: z.string().length(4),
});

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});
