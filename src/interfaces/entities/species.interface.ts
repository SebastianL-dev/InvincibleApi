import { Types } from "mongoose";
import Images from "./images.interface";

/**
 * Fields required by the species model.
 *
 * @interface Species
 */
export default interface Species {
  _id?: Types.ObjectId;
  id: number;
  name: string;
  status: string;
  home?: Types.ObjectId | null;
  images?: Images | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Home {
  name: string;
}

export interface PopulatedSpecies extends Omit<Species, "home"> {
  home: string | null;
}
