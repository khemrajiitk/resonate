import { Response, NextFunction } from 'express';
import * as slotService from '../services/slot.service';
import { CustomRequest } from '../utils/custom.request';

export const createSlot = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    req.logger?.info({ message: 'Create slot request received' });
    const slot = await slotService.createSlot(req.body);
    res.status(201).json({ slot });
  } catch (error) {
    next(error);
  }
};

export const getSlots = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    req.logger?.info({ message: 'Get all slots request received' });
    const slots = await slotService.getSlots();
    res.status(200).json({ slots });
  } catch (error) {
    next(error);
  }
};

export const getSlotById = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      req.logger?.info({ message: 'Get all slots request received' });
      const slots = await slotService.getSlotById(req.params.id);
      res.status(200).json({ slots });
    } catch (error) {
      next(error);
    }
  };

export const updateSlot = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    req.logger?.info({ message: 'Update slot request received' });
    const slot = await slotService.updateSlot(req.params.id, req.body);
    res.status(200).json({ slot });
  } catch (error) {
    next(error);
  }
};

export const deleteSlot = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    req.logger?.info({ message: 'Delete slot request received' });
    await slotService.deleteSlot(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
