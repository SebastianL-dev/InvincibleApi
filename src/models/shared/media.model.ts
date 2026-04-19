import mongoose, { InferSchemaType } from 'mongoose';

export const mediaSchema = mongoose.Schema.create(
  {
    url: { type: String, required: true },
    caption: { type: String },
  },
  { _id: false, timestamps: false, versionKey: false },
);
