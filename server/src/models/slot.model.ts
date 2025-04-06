import { ObjectId } from "mongodb";

export interface Slot {
    _id?: ObjectId;
    day: string;
    startTime: string; // in HH:mm format (24h)
    endTime: string;   // in HH:mm format (24h)
    isBooked: boolean;
    date: string;      // in dd/mm/yyyy format
    createdAt?: Date;
    updatedAt?: Date;
  }