import locationModel from "../models/location.model.js";

export async function findAllLocations() {
  const foundLocations = await locationModel
    .find({})
    .select(
      "-_id -createdAt -updatedAt -description -cataclysmicEvents -pointsOfInterest"
    )
    .populate("inhabitants", "-_id id name")
    .lean();

  return foundLocations;
}

export async function findLocationById(id: number) {
  const foundLocation = await locationModel
    .findOne({ id })
    .select("-_id -createdAt -updatedAt")
    .populate("inhabitants", "-_id id name status leader images")
    .lean();

  return foundLocation;
}
