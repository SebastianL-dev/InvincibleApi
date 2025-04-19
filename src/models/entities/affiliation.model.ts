import mongoose from "mongoose";
import imagesType from "../types/images.type.js";

const affiliationSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
    leader: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Character",
      required: true,
    },
    location: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Location",
      required: true,
    },
    images: imagesType,
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Affiliation", affiliationSchema);
