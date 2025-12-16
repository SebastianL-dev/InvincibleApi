import mongoose from "mongoose";

export default interface Location {
  id: number;
  name: string;
  type: "Planet" | "House";
  status: "Active" | "Destroyed";
  residents: mongoose.Types.ObjectId[];
  images: string[];
}
