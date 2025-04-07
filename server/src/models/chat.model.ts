import { AppointmentStatus, AppointmentType } from "./appointment.model";

export interface Chat {
    _id?: string;
    user: MiniUser;
    userType: 'AI' | 'user';
    message: Message;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Message {
    content: string;
    intent?: string;
    data?: {
        appointment: {
            appointmentType: AppointmentType,
            status: AppointmentStatus.Scheduled,
            patients: [
                {
                    slotId: string,
                    fullName: string,
                    phoneNumber: string,
                    dob: string,
                }
            ],
        }
    }
}

export interface MiniUser {
    id: string;
    name: string;
}
