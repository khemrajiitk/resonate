import { z } from 'zod';
import { emailSchema, nameSchema, passwordSchema, phoneSchema } from '../utils/common-schema';

export const signupSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    phone: phoneSchema,
    dob: z.string().length(10, { message: 'Invalid date of birth (dd/mm/yyyy)' }),
    name: nameSchema,
    otp: z.string().length(4),
});

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

export type SignupReq = z.infer<typeof signupSchema>;
export type LoginReq = z.infer<typeof loginSchema>;
