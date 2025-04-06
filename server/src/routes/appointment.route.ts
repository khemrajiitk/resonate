import { Router } from 'express';
import { validateRequest } from '../middlewares/validation.middleware';
import * as appointmentController from '../controllers/appointment.controller';
import { createAppointmentSchema, updateAppointmentSchema } from '../request/appointment.request';
import { objectIdSchema, ValidationSource } from '../utils/common-schema';

const router = Router();

router.post(
    '/',
    validateRequest(createAppointmentSchema, ValidationSource.BODY),
    appointmentController.createAppointment
);

router.get('/', appointmentController.getAppointments);

router.get('/:id',
    validateRequest(objectIdSchema, ValidationSource.PARAMS),
    appointmentController.getAppointmentById);

router.put(
    '/:id',
    validateRequest(updateAppointmentSchema, ValidationSource.BODY),
    validateRequest(objectIdSchema, ValidationSource.PARAMS),
    appointmentController.updateAppointment
);

router.delete('/:id',
    validateRequest(objectIdSchema, ValidationSource.PARAMS),
    appointmentController.deleteAppointment);

export default router;
