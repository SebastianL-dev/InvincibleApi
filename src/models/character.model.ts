import mongoose from "mongoose";

const characterSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    fullName: { type: String, required: true },
    shortName: { type: String, required: true },
    otherNames: [{ type: String, required: false }],
    age: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    status: {
      type: String,
      enum: ["Alive", "Deceased", "Unknown"],
      required: true,
    },
    occupation: { type: String, required: true },
    description: [{ type: String, required: true }],
    species: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Species",
      required: true,
    },
    origin: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Location",
      required: true,
    },
    images: [{ type: String, required: true }],
  },
  { timestamps: false, versionKey: false }
);

const characterModel = mongoose.model("Character", characterSchema);

export default characterModel;
