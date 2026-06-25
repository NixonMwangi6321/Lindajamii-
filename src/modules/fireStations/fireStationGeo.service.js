const FireStation =
require("./fireStation.model");

const findNearestFireStation =
async (longitude, latitude) => {

  return await FireStation.findOne({
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

};

module.exports = {
  findNearestFireStation
};