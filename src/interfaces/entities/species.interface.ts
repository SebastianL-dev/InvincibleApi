import { Types } from "mongoose";
import Images from "./images.interface";

export default interface Species {
  _id?: Types.ObjectId;
  id: number;
  name: string;
  status: string;
  home: Types.ObjectId;
  images?: Images | null;
  createdAt?: Date;
  updatedAt?: Date;
}
