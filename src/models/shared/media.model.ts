import mongoose from 'mongoose';

export const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    caption: { type: String },
  },
  { _id: false, timestamps: false, versionKey: false },
);
