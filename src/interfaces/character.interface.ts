import mongoose from "mongoose";

export default interface Character {
  _id?: mongoose.Types.ObjectId;
  id: number;
  fullName: string;
  shortName: string;
  alias?: string;
  codeNames?: string[];
  nickNames?: string[];
  age: string;
  gender: "Male" | "Female" | "Unknown";
  status: "Alive" | "Deceased" | "Unknown";
  role: string;
  occupations?: string[];
  powers?: string[];
  abilities?: string[];
  description: string[];
  quotes?: string[];

  origin: mongoose.Types.ObjectId;
  species: mongoose.Types.ObjectId;

  affiliations?: mongoose.Types.ObjectId[];
  relatives?: mongoose.Types.ObjectId[];
  allies?: mongoose.Types.ObjectId[];
  enemies?: mongoose.Types.ObjectId[];

  images: {
    variants?: string[];
    wallpaper?: string;
  };
}
