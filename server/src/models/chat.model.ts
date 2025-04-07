import { CreateAppointmentRequest, UpdateAppointmentRequest } from "../request/appointment.request";

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
  data?: {
    appointment?: CreateAppointmentRequest;
    updateAppointment?: UpdateAppointmentRequest;
  };
}

export interface MiniUser {
  id: string;
  name: string;
}
