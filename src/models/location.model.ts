import mongoose, { InferSchemaType } from 'mongoose';
import { imagesSchema } from './shared/images.model.js';

export const LOCATION_TYPES = ['Planet', 'City', 'Dimension', 'Building'] as const;
export const LOCATION_STATUSES = ['Active', 'Destroyed', 'Unknown'] as const;

const locationSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: LOCATION_TYPES,
      required: true,
    },
    status: {
      type: String,
      enum: LOCATION_STATUSES,
      default: 'Active',
      required: true,
    },
    description: { type: [String] },
    inhabitants: { type: [mongoose.Types.ObjectId], ref: 'Species' },
    images: { type: imagesSchema, default: [] },
  },
  { timestamps: true, versionKey: false },
);

export type Location = InferSchemaType<typeof locationSchema>;
export const locationModel = mongoose.model('Location', locationSchema);
