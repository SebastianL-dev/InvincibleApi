import mongoose from "mongoose";

const speciesSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, require: true },
    status: { type: String, enum: ["Active", "Endangered"] },
    home: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Location",
      required: true,
    },
    images: [{ type: String, required: true }],
  },
  { timestamps: false, versionKey: false }
);

const speciesModel = mongoose.model("Species", speciesSchema);

export default speciesModel;
