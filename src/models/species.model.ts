import mongoose from "mongoose";

const speciesSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    status: { type: String, enum: ["Active", "Endangered", "Unknown"] },
    leader: { type: String },

    home: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Location",
      required: true,
    },

    description: [{ type: String, required: true }],
    characteristics: [{ type: String, required: true }],
    powers: [{ type: String }],
    abilities: [{ type: String }],
    weakness: [{ type: String }],

    images: {
      main: { type: String },
      gallery: [{ type: String }],
    },
  },
  { timestamps: true, versionKey: false }
);

const speciesModel = mongoose.model("Species", speciesSchema);

export default speciesModel;
