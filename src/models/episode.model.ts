import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    episodeCode: { type: String, required: true, trim: true },
    season: { type: Number, required: true, trim: true },
    episode: { type: Number, required: true, trim: true },
    releaseDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Episode", episodeSchema);
