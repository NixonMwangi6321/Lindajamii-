const PoliceStation =
require("./policeStation.model");

const findNearestPoliceStation =
async (longitude, latitude) => {

  return await PoliceStation.findOne({
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
  findNearestPoliceStation
};