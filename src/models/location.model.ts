import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["Planet", "House"], required: true },
    status: { type: String, enum: ["Active", "Destroyed"] },
    residents: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Species",
      required: true,
    },
    images: [{ type: String, required: true }],
  },
  { timestamps: false, versionKey: false }
);

const locationModel = mongoose.model("Location", locationSchema);

export default locationModel;
