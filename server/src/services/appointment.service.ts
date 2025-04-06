import { CreateAppointmentRequest, UpdateAppointmentRequest } from '../request/appointment.request';
import { CustomError } from '../utils/custom.error';
import * as AppointmentRepo from '../repos/appointment.repo';
import { bookSlotByIds, findSlotById, freeSlotByIds } from '../repos/slot.repo';
import { v4 as uuidv4 } from 'uuid';
import { AppointmentStatus } from '../models/appointment.model';

export const createAppointment = async (data: CreateAppointmentRequest) => {
    const existing = await AppointmentRepo.findAppointmentByUserId(data.userId);

    if (existing) throw new CustomError('Appointment already exists', 400);

    for (const patient of data.patients) {
        const slotExisting = await findSlotById(patient.slotId);
        if (!slotExisting) throw new CustomError('Slot Not fount', 400);
        if (slotExisting.isBooked) throw new CustomError('Slot Already Booked', 400);
    }

    data.patients = data.patients.map(patient => {
        return { ...patient, id: uuidv4()};
    });

    const appointment = await AppointmentRepo.createAppointment({ ...data });

    await bookSlotByIds(data.patients.map(patient => patient.slotId));

    return appointment;
};

export const getAppointments = async (userId?: string) => {
    return AppointmentRepo.getAllAppointments(userId);
};

export const updateAppointment = async (id: string, data: UpdateAppointmentRequest) => {
    const existing = await AppointmentRepo.findAppointmentById(id);
    if (!existing) throw new CustomError('Appointment Not fount', 400);

    if (existing.status != AppointmentStatus.Scheduled) throw new CustomError('Appointment already completed', 400);

    if (data.action === 'reschedule' && data.newSlotId) {
        
        const slotExisting = await findSlotById(data.newSlotId);
        if (!slotExisting) throw new CustomError('Slot Not fount', 400);
        if (slotExisting.isBooked) throw new CustomError('Slot Already Booked', 400);

        const update = {
            patients: existing.patients.map(patient => {
                return { ...patient, slotId: data.newSlotId }
            }),
            history: existing.history.push({ status: AppointmentStatus.Scheduled, note: 'Appointment Updated', date: new Date() })
        };
        const updated = await AppointmentRepo.updateAppointment(id, update);

        if (!updated) throw new CustomError('Appointment not found', 404);

        await freeSlotByIds(existing.patients.map(patient => patient.slotId));
        await bookSlotByIds([data.newSlotId]);
        return updated;
       
    } else if (data.action === 'cancel') {
        const update = {
            status: AppointmentStatus.Cancel,
            history: existing.history.push({ status: AppointmentStatus.Cancel, note: 'Appointment cancelled', date: new Date() })
        };
        const updated = await AppointmentRepo.updateAppointment(id, update);
        if (!updated) throw new CustomError('Appointment not found', 404);

        await freeSlotByIds(existing.patients.map(patient => patient.slotId));
        return updated;
    }
};

export const getAppointmentById = async (id: string) => {
    const appointment = await AppointmentRepo.findAppointmentById(id);
    if (!appointment) throw new CustomError('Appointment not found', 404);
    return appointment;
};

export const deleteAppointment = async (id: string) => {
    const deleted = await AppointmentRepo.deleteAppointment(id);
    if (!deleted) throw new CustomError('Appointment not found', 404);
    return deleted;
};
