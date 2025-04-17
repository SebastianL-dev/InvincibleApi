import { Types } from "mongoose";
import Images from "./images.interface";

export default interface Location {
  _id?: Types.ObjectId;
  id: number;
  name: string;
  type: string;
  status: string;
  images: Images;
}
