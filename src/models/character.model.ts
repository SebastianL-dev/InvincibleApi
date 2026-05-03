import mongoose, { InferSchemaType } from 'mongoose';
import { imagesSchema } from './shared/images.model.js';

export const CHARACTER_STATUSES = ['Alive', 'Deceased', 'Unknown'] as const;

const characterSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    alias: { type: String },
    age: { type: String },
    gender: { type: String },
    status: {
      type: String,
      enum: CHARACTER_STATUSES,
      default: 'Alive',
      required: true,
    },
    powers: { type: [String] },
    abilities: { type: [String] },
    description: { type: [String] },
    quotes: { type: [String] },
    origin: { type: mongoose.Types.ObjectId, ref: 'Location', required: true },
    species: { type: [mongoose.Types.ObjectId], ref: 'Species' },
    firstAppearance: { type: mongoose.Types.ObjectId, ref: 'Episode' },
    affiliations: { type: [mongoose.Types.ObjectId], ref: 'Group', default: [] },
    images: { type: imagesSchema, default: [] },
  },
  { timestamps: true, versionKey: false },
);

export type Character = InferSchemaType<typeof characterSchema>;
export const characterModel = mongoose.model('Character', characterSchema);
