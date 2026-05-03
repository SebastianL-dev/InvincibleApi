import mongoose, { InferSchemaType } from 'mongoose';
import { imagesSchema } from './shared/images.model.js';

export const GROUP_STATUSES = ['Active', 'Disbanded', 'Inactive', 'Unknown'] as const;

const groupSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    status: { type: String, enum: GROUP_STATUSES, default: 'Active', required: true },
    description: { type: String },
    location: { type: mongoose.Types.ObjectId, ref: 'Location', required: true },
    members: { type: [mongoose.Types.ObjectId], ref: 'Character', required: true },
    images: { type: imagesSchema, default: [] },
  },
  { timestamps: true, versionKey: false },
);

export type Group = InferSchemaType<typeof groupSchema>;
export const groupModel = mongoose.model('Group', groupSchema);
