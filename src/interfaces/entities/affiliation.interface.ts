import { Types } from "mongoose";
import Images from "./images.interface";

export default interface Affiliation {
  _id?: Types.ObjectId;
  id: number;
  name: string;
  status: string;
  leader: Types.ObjectId;
  location: Types.ObjectId;
  images: Images;
  createdAt?: Date;
  updatedAt?: Date;
}
