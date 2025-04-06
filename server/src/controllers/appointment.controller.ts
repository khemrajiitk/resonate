import { Response, NextFunction } from 'express';
import * as appointmentService from '../services/appointment.service';
import { CustomRequest } from '../utils/custom.request';

export const createAppointment = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        req.logger?.info({ message: 'Create appointment request received' });
        const appointment = await appointmentService.createAppointment(req.body);
        res.status(201).json({ appointment });
    } catch (error) {
        next(error);
    }
};

export const getAppointments = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        req.logger?.info({ message: 'Get all appointments request received' });
        const appointments = await appointmentService.getAppointments();
        res.status(200).json({ appointments });
    } catch (error) {
        next(error);
    }
};

export const getAppointmentById = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        req.logger?.info({ message: 'Get all appointments request received' });
        const appointment = await appointmentService.getAppointmentById(req.params.id);
        res.status(200).json({ appointment });
    } catch (error) {
        next(error);
    }
};

export const updateAppointment = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        req.logger?.info({ message: 'Update appointment request received' });
        const appointment = await appointmentService.updateAppointment(req.params.id, req.body);
        res.status(200).json({ appointment });
    } catch (error) {
        next(error);
    }
};

export const deleteAppointment = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        req.logger?.info({ message: 'Delete appointment request received' });
        await appointmentService.deleteAppointment(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
