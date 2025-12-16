import mongoose from "mongoose";

export default interface Character {
  id: number;
  fullName: string;
  shortName: string;
  otherNames?: string[];
  age: string;
  gender: "Male" | "Female";
  status: "Alive" | "Deceased" | "Unknown";
  occupation: string;
  description: string[];
  species: mongoose.Types.ObjectId;
  origin: mongoose.Types.ObjectId;
  images: string[];
}
