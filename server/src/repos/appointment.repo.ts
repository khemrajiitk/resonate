import { ObjectId } from 'mongodb';
import { connectDB } from '../config/db';
import { Appointment, AppointmentStatus } from '../models/appointment.model';
import { CreateAppointmentRequest } from '../request/appointment.request';

const COLLECTION_NAME = 'appointments';

export const createAppointment = async (appointment: CreateAppointmentRequest): Promise<Appointment> => {
    const db = await connectDB();

    const now = new Date();
    const result = await db.collection<Appointment>(COLLECTION_NAME).insertOne({
        ...appointment,
        status: AppointmentStatus.Scheduled,
        history: [{ status: AppointmentStatus.Scheduled, note: 'Appointment sheduled', date: now }],
    });
    return {
        ...appointment, _id: result.insertedId, status: AppointmentStatus.Scheduled,
        history: [{ status: AppointmentStatus.Scheduled, note: 'Appointment sheduled', date: now }],
    };
};

export const getAllAppointments = async (userId?: string): Promise<Appointment[]> => {
    const db = await connectDB();
    return db.collection<Appointment>(COLLECTION_NAME).find(
        userId ? { userId } : {}
    ).toArray();
};

export const updateAppointment = async (id: string, data: any): Promise<Appointment | null> => {
    const db = await connectDB();
    const result = await db.collection<Appointment>(COLLECTION_NAME).findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: data },
        { returnDocument: 'after' }
    );
    return result;
};

export const deleteAppointment = async (id: string): Promise<Appointment | null> => {
    const db = await connectDB();
    const result = await db.collection<Appointment>(COLLECTION_NAME).findOneAndDelete({ _id: new ObjectId(id) });
    return result;
};

export const findAppointmentByUserId = async (
    userId: string,
): Promise<Appointment | null> => {
    const db = await connectDB();
    const result = await db.collection<Appointment>(COLLECTION_NAME).findOne({ userId });

    return result
};

export const findAppointmentById = async (
    id: string,
): Promise<Appointment | null> => {
    const db = await connectDB();
    const result = await db.collection<Appointment>(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });

    return result
};
