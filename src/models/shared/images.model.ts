import mongoose, { InferSchemaType } from 'mongoose';
import { mediaSchema } from './media.model.js';

export const imagesSchema = mongoose.Schema.create(
  {
    gallery: { type: [mediaSchema], default: [] },
    portrait: { type: mediaSchema },
    banner: { type: mediaSchema },
  },
  { _id: false, timestamps: false, versionKey: false },
);
