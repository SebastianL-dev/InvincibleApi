import mongoose, { InferSchemaType } from 'mongoose';

const episodeSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    description: { type: String },
    season: { type: Number, required: true },
    episode: { type: Number, required: true },
    airDate: { type: Date, required: true },
    poster: { type: String },
  },
  { timestamps: true, versionKey: false },
);

export type Episode = InferSchemaType<typeof episodeSchema>;
export const episodeModel = mongoose.model('Episode', episodeSchema);
