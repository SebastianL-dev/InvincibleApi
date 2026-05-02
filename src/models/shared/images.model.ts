import mongoose from 'mongoose';
import { mediaSchema } from './media.model.js';

export const imagesSchema = new mongoose.Schema(
  {
    portrait: { type: String },
    gallery: { type: [mediaSchema], default: [] },
  },
  { _id: false, timestamps: false, versionKey: false },
);
