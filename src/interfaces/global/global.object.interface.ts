import { Types } from "mongoose";

export default interface GlobalObject {
  _id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
