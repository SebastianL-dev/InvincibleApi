import { Types } from "mongoose";

/**
 * Global interface with id and dates fields to use in any object.
 *
 * @interface GlobalObject
 */
export default interface GlobalObject {
  _id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
