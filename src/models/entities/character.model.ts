import mongoose from "mongoose";
import imagesType from "../types/images.type.js";

const characterSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    fullName: { type: String, required: true, trim: true },
    shortName: { type: String, required: true, trim: true },
    age: { type: Number, required: true, trim: true },
    gender: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
    occupation: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    species: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Species",
      require: true,
    },
    origin: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Location",
      require: true,
    },
    location: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Location",
      require: true,
    },
    firstAppearance: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Episode",
      required: true,
    },
    images: imagesType,
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Character", characterSchema);
