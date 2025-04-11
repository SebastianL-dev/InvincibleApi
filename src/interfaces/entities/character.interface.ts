import { Types } from "mongoose";
import Images from "./images.interface";

/**
 * Fields required by the character model.
 *
 * @interface Character
 */
export default interface Character {
  id: number;
  fullName: string;
  shortName: string;
  age: number;
  gender: string;
  status: string;
  occupation: string;
  description: string;
  species?: Types.ObjectId | null;
  origin?: Types.ObjectId | null;
  location?: Types.ObjectId | null;
  firstAppearance?: Types.ObjectId | null;
  images?: Images | null;
  createdAt?: Date;
  updatedAt?: Date;
}
