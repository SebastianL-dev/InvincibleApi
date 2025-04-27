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

/**
 * Species with poppulated home.
 *
 * @interface PopulatedSpecies
 */
export interface PopulatedSpecies extends Omit<Species, "home"> {
  home: string | null;
}
