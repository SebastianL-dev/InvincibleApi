import mongoose from "mongoose";
import imagesType from "../types/images.type.js";

const locationSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    images: imagesType,
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Location", locationSchema);
