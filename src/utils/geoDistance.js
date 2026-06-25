const Ambulance =
require("../modules/ambulances/ambulance.model");

const findNearestAmbulance =
async (longitude, latitude) => {

  const ambulance =
  await Ambulance.findOne({
    status: "AVAILABLE",
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [
            longitude,
            latitude
          ]
        }
      }
    }
  });

  return ambulance;
};

module.exports = {
  findNearestAmbulance
};