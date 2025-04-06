import { ObjectId } from 'mongodb';
import { connectDB } from '../config/db';
import { Slot } from '../models/slot.model';
import { CreateSlotRequest, UpdateSlotRequest } from '../request/slot.request';

const COLLECTION_NAME = 'slots';

export const createSlot = async (slot: CreateSlotRequest & { isBooked?: boolean }): Promise<Slot> => {
  const db = await connectDB();
  const result = await db.collection<Slot>(COLLECTION_NAME).insertOne({
    ...slot,
    isBooked: slot.isBooked ?? false,
  });
  return { ...slot, _id: result.insertedId, isBooked: slot.isBooked ?? false };
};

export const getAllSlots = async (): Promise<Slot[]> => {
  const db = await connectDB();
  return db.collection<Slot>(COLLECTION_NAME).find().toArray();
};

export const updateSlot = async (id: string, data: UpdateSlotRequest): Promise<Slot | null> => {
  const db = await connectDB();
  const result = await db.collection<Slot>(COLLECTION_NAME).findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: data },
    { returnDocument: 'after' }
  );
  return result;
};

export const deleteSlot = async (id: string): Promise<Slot | null> => {
  const db = await connectDB();
  const result = await db.collection<Slot>(COLLECTION_NAME).findOneAndDelete({ _id: new ObjectId(id) });
  return result;
};

export const findSlotByDayAndTime = async (
  date: string,
  startTime: string,
  endTime: string
): Promise<Slot | null> => {
  const db = await connectDB();
  const result = await db.collection<Slot>(COLLECTION_NAME).findOne({ date, startTime, endTime });

  return result
};

export const findSlotById = async (
    id: string,
  ): Promise<Slot | null> => {
    const db = await connectDB();
    const result = await db.collection<Slot>(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
  
    return result
  };
