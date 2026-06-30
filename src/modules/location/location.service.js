const Ambulance =
require("../ambulances/ambulance.model");

const updateVehicleLocation =
async (
  ambulanceId,
  location
) => {

  const ambulance =
  await Ambulance.findById(
    ambulanceId
  );

  if (!ambulance) {

    throw new Error(
      "Ambulance not found"
    );

  }

  ambulance.currentLocation = {

    latitude:
    location.latitude,

    longitude:
    location.longitude,

    heading:
    location.heading || 0,

    speed:
    location.speed || 0,

    updatedAt:
    new Date()

  };

  await ambulance.save();

  return ambulance;

};

module.exports = {

  updateVehicleLocation

};