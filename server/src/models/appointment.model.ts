import { ObjectId } from 'mongodb';

export enum AppointmentType {
    Cleaning = 'Cleaning',
    GeneralCheckup = 'General checkup',
    Emergency = 'Emergency',
}

export enum AppointmentStatus {
    Scheduled = 'Scheduled',
    Cancel = 'Cancel',
    Completed = 'Completed',
}


export interface Patient {
    id?: string;
    slotId: string;
    fullName: string;
    phoneNumber: string;
    dob: string;  // Date of Birth in string format (can be changed to Date if needed)
}

export interface AppointmentHistory {
    status: AppointmentStatus;
    note: string;
    date: Date;
}

export interface Appointment {
    _id?: ObjectId;
    userId: string;
    patients: Patient[];  // Array of patients for the appointment
    appointmentType: AppointmentType;
    status: AppointmentStatus;
    history: AppointmentHistory[];
    emergencySummary?: string;
    createdAt?: Date;
    updatedAt?: Date;
}