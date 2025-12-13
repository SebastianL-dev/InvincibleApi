import { Types } from "mongoose";
import Images from "./images.interface";

export default interface Location {
  _id?: Types.ObjectId;
  id: number;
  name: string;
  type: string;
  inhabitants?: string[];
  images?: Images | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PopulatedLocation extends Omit<Location, "inhabitants"> {
  inhabitants?: { name: string }[];
}
