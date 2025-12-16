import mongoose from "mongoose";

export default interface Species {
  id: number;
  name: string;
  status: "Active" | "Endangered";
  home: mongoose.Types.ObjectId;
  images: [string];
}
