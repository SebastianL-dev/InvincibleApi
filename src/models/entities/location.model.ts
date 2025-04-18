import mongoose from "mongoose";
import imagesType from "../types/images.type.js";

const locationSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
    images: imagesType,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false,
  }
);

locationSchema.virtual("inhabitants", {
  ref: "Species",
  localField: "_id",
  foreignField: "home",
});

export default mongoose.model("Location", locationSchema);
