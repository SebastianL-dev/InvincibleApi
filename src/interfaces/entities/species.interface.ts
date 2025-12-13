import { Types } from "mongoose";
import Images from "./images.interface";

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

export interface PopulatedSpecies extends Omit<Species, "home"> {
  home: string | null;
}
