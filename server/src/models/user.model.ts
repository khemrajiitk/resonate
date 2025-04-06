import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  email: string;
  phone: string;
  password: string;
  name: string;
  dob: string;
}