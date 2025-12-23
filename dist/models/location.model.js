import mongoose from "mongoose";
const locationSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["Planet", "House"], required: true },
    status: {
        type: String,
        enum: ["Active", "Destroyed", "Unknown"],
        required: true,
    },
    inhabitants: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Species" }],
    description: [{ type: String, required: true }],
    cataclysmicEvents: [{ type: String }],
    pointsOfInterest: [
        { type: mongoose.SchemaTypes.ObjectId, ref: "Location" },
    ],
    images: {
        main: { type: String },
        gallery: [{ type: String }],
    },
}, { timestamps: true, versionKey: false });
const locationModel = mongoose.model("Location", locationSchema);
export default locationModel;
