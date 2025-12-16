import mongoose from "mongoose";

const characterSchema = new mongoose.Schema(
  { id: { type: Number, required: true, unique: true } },
  { timestamps: false, versionKey: false }
);

const characterModel = mongoose.model("Character", characterSchema);

export default characterModel;
