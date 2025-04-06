import { Router } from 'express';
import { validateRequest } from '../middlewares/validation.middleware';
import * as slotController from '../controllers/slot.controller';
import { createSlotSchema, updateSlotSchema } from '../request/slot.request';
import { objectIdSchema, ValidationSource } from '../utils/common-schema';

const router = Router();

router.post(
    '/',
    validateRequest(createSlotSchema, ValidationSource.BODY),
    slotController.createSlot
);

router.get('/', slotController.getSlots);

router.get('/:id',
    validateRequest(objectIdSchema, ValidationSource.PARAMS),
    slotController.getSlotById);

router.put(
    '/:id',
    validateRequest(updateSlotSchema, ValidationSource.BODY),
    validateRequest(objectIdSchema, ValidationSource.PARAMS),
    slotController.updateSlot
);

router.delete('/:id',
    validateRequest(objectIdSchema, ValidationSource.PARAMS),
    slotController.deleteSlot);

export default router;
