import mongoose from "mongoose";

export default interface Location {
  _id?: mongoose.Types.ObjectId;
  id: number;
  name: string;
  type: "Planet" | "House";
  status: "Active" | "Destroyed" | "Unknown";

  inhabitants?: mongoose.Types.ObjectId[];
  description: string[];
  cataclysmicEvents?: string[];
  pointsOfInterest?: mongoose.Types.ObjectId[];

  images: {
    main: string;
    gallery?: string[];
  };
}
