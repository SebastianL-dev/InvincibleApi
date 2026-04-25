import mongoose, { InferSchemaType } from 'mongoose';
import { imagesSchema } from './shared/images.model.js';

export const SPECIES_STATUSES = ['Active', 'Endangered', 'Extinct', 'Unknown'];

const SpeciesSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    status: {
      type: String,
      enum: SPECIES_STATUSES,
      default: 'Active',
      required: true,
    },
    description: [{ type: String }],
    home: { type: mongoose.Types.ObjectId, ref: 'Location', required: true },
    images: { type: [imagesSchema], default: [] },
  },
  { timestamps: true, versionKey: false },
);

export type Species = InferSchemaType<typeof SpeciesSchema>;
export const speciesModel = mongoose.model('Species', SpeciesSchema);
