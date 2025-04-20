import { Types } from "mongoose";
import Images from "./images.interface";

export default interface Affiliation {
  _id?: Types.ObjectId;
  id: number;
  name: string;
  status: string;
  leader?: Types.ObjectId | null;
  location?: Types.ObjectId | null;
  images?: Images | null;
  createdAt?: Date;
  updatedAt?: Date;
}
