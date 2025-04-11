import characterModel from "../models/character.model.js";
import "../models/species.model.js";
import "../models/location.model.js";
import "../models/episode.model.js";

export async function getAllCharacters() {
  const Characters = await characterModel
    .find()
    .select("-_id")
    .populate({
      path: "species",
      select: "-_id",
      populate: { path: "location", select: "name type images id -_id" },
    })
    .populate({
      path: "origin",
      select: "-_id",
      populate: { path: "inhabitants", select: "name images id -_id" },
    })
    .populate({
      path: "location",
      select: "-_id",
      populate: { path: "inhabitants", select: "name images id -_id" },
    })
    .populate({
      path: "firstAppearance",
      select: "-_id",
    });

  return Characters;
}
