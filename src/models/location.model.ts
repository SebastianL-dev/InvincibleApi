import mongoose, { InferSchemaType } from 'mongoose';
import { imagesSchema } from './shared/images.model.js';

const locationSchema = mongoose.Schema.create(
  {
    id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    status: {
      type: String,
      enum: ['Active', 'Destroyed', 'Unknown'],
      default: 'Active',
      required: true,
    },
    description: [{ type: String }],
    inhabitants: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Species' }],
    points_of_interest: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Location' }],
    images: { type: [imagesSchema], default: [] },
  },
  { timestamps: true, versionKey: false },
);

export type Location = InferSchemaType<typeof locationSchema>;
export const locationModel = mongoose.model('Location', locationSchema);
