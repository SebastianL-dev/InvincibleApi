import { Types } from "mongoose";

/**
 * Fields required by episode model
 *
 * @interface Episode
 */
export default interface Episode {
  _id?: Types.ObjectId;
  id: number;
  title: string;
  description: string;
  season: number;
  episode: number;
  duration?: {
    time: number;
    unit: string;
  } | null;
  platform: string;
  releaseDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
