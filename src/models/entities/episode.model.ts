import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, trim: true, unique: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    season: { type: Number, required: true, trim: true },
    episode: { type: Number, required: true, trim: true },
    duration: {
      time: { type: Number, required: true, trim: true },
      unit: { type: String, required: true, trim: true },
    },
    platform: { type: String, required: true, trim: true },
    releaseDate: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Episode", episodeSchema);
