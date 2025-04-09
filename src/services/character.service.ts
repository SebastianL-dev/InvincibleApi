import mongoose from "mongoose";
import characterModel from "../models/character.model";

export async function getAllCharacters() {
  const Characters = await characterModel
    .find()
    .populate("species")
    .populate("location")
    .populate("episode");

  return Characters;
}
