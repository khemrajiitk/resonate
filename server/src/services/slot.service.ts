import * as SlotRepo from '../repos/slot.repo';
import { CreateSlotRequest, UpdateSlotRequest } from '../request/slot.request';
import { CustomError } from '../utils/custom.error';

export const createSlot = async (data: CreateSlotRequest) => {
  const existing = await SlotRepo.findSlotByDayAndTime(data.date, data.startTime, data.endTime);
  if (existing) throw new CustomError('Slot already exists for the given time', 400);
  return SlotRepo.createSlot({ ...data, isBooked: false });
};

export const getSlots = async () => {
  return SlotRepo.getAllSlots();
};

export const updateSlot = async (id: string, data: UpdateSlotRequest) => {
  const updated = await SlotRepo.updateSlot(id, data);
  if (!updated) throw new CustomError('Slot not found', 404);
  return updated;
};

export const getSlotById = async (id: string) => {
    const slot = await SlotRepo.findSlotById(id);
    if (!slot) throw new CustomError('Slot not found', 404);
    return slot;
  };

export const deleteSlot = async (id: string) => {
  const deleted = await SlotRepo.deleteSlot(id);
  if (!deleted) throw new CustomError('Slot not found', 404);
  return deleted;
};
