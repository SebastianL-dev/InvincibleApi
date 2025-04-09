import mongoose from "mongoose";
import imagesType from "./types/images.type";

const affiliationSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
    location: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Location",
      required: true,
    },
    images: imagesType,
  },
  { timestamps: true }
);

export default mongoose.model("Affiliation", affiliationSchema);
