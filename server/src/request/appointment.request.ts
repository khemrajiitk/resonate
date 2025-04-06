import { z } from 'zod';
import { objectIdSchema } from '../utils/common-schema';
import { AppointmentType } from '../models/appointment.model';

const patientSchema = z.object({
    id: z.string().optional(),
    fullName: z.string().min(1, 'Full name is required'),
    phoneNumber: z.string().min(10, 'Phone number should be at least 10 digits'),
    dob: z.string().min(1, 'Date of birth is required'),
    slotId: z.string().min(1, 'Slot ID is required'),
});

export const createAppointmentSchema = z.object({
    userId: objectIdSchema,
    patients: z.array(patientSchema).min(1, 'At least one patient is required'),
    appointmentType: z.nativeEnum(AppointmentType),
    emergencySummary: z.string().optional(),
});

export const updateAppointmentSchema = z.object({
    patientId: z.string().min(1, 'Patient ID is required'),
    action: z.enum(['reschedule', 'cancel']),
    newSlotId: z.string().optional(),
});


export type CreateAppointmentRequest = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentRequest = z.infer<typeof updateAppointmentSchema>;

