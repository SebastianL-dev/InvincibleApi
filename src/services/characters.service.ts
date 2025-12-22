import characterModel from "../models/character.model.js";

export async function findAllCharacters() {
  // Remove excesive fields in this endpoint -> many results, all characters.
  const charactersFound = await characterModel
    .find()
    .select(
      "-_id -createdAt -updatedAt -fullName -nickNames -occupations -abilities -affiliations -relatives -allies -enemies -description -powers"
    )
    .populate("origin", "-_id id name")
    .populate("species", "-_id id name")
    .lean();

  return charactersFound;
}

export async function findCharacterById(id: number) {
  const characterFound = await characterModel
    .findOne({ id })
    .select("-_id -createdAt -updatedAt")
    .populate("origin", "-_id name type status images")
    .populate("species", "-_id name status leader images")
    .lean();

  return characterFound;
}
