import mongoose from "mongoose";

export default interface Species {
  _id?: mongoose.Types.ObjectId;
  id: number;
  name: string;
  status: "Active" | "Endangered" | "Unknown";
  leader?: string;
  home: mongoose.Types.ObjectId;
  description: string[];
  characteristics: string[];
  powers?: string[];
  abilities?: string[];
  weakness?: string[];
  images: {
    main: string;
    gallery: string[];
  };
}
