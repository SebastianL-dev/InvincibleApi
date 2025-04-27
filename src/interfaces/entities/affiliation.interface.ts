import { Types } from "mongoose";
import Images from "./images.interface";

/**
 * Fields required by the affiliation model.
 *
 * @interface Affiliation
 */
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

/**
 * Affiliation with poppulated location and leader.
 *
 * @interface PopulatedAffiliation
 */
export interface PopulatedAffiliation
  extends Omit<Affiliation, "leader" | "location"> {
  leader: string | null;
  location: string | null;
}
