const Hospital =
require("./hospital.model");

const findNearestHospital =
async (
  longitude,
  latitude
) => {

  const hospital =
  await Hospital.findOne({
    active: true,
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

  return hospital;
};

module.exports = {
  findNearestHospital
};