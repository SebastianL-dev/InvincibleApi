import { Types } from "mongoose";
import Images from "./images.interface";

/**
 * Fields required by the location model.
 *
 * @interface Location
 */
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

/**
 * Location with poppulated inhabitants.
 *
 * @interface PopulatedLocation
 */
export interface PopulatedLocation extends Omit<Location, "inhabitants"> {
  inhabitants?: { name: string }[];
}
