import mongoose from "mongoose";

const characterSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    fullName: { type: String, required: true },
    shortName: { type: String, required: true },
    alias: { type: String },
    codeNames: [{ type: String }],
    nickNames: [{ type: String }],
    age: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    status: {
      type: String,
      enum: ["Alive", "Deceased", "Unknown"],
      required: true,
    },
    role: { type: String, required: true },
    occupations: [{ type: String }],
    powers: [{ type: String }],
    abilities: [{ type: String }],
    description: [{ type: String, required: true }],
    quotes: [{ type: String }],

    origin: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Location",
      required: true,
    },
    species: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Species",
      required: true,
    },
    affiliations: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Group" }],
    relatives: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Character" }],
    allies: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Character" }],
    enemies: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Character" }],

    images: {
      variants: [{ type: String }],
      wallpaper: { type: String },
    },
  },
  { timestamps: true, versionKey: false }
);

const characterModel = mongoose.model("Character", characterSchema);

export default characterModel;
