import mongoose from "mongoose";
import imagesType from "../types/images.type.js";

const locationSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    inhabitants: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Species",
      required: true,
    },
    images: imagesType,
  },
  { timestamps: true }
);

export default mongoose.model("Location", locationSchema);
