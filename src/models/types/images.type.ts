import mongoose from "mongoose";

const imagesType = new mongoose.Schema(
  {
    main: { type: String, required: true, trim: true },
    variant: { type: String, required: false, trim: true },
    alternative: { type: String, required: false, trim: true },
  },
  { _id: false }
);

export default imagesType;
