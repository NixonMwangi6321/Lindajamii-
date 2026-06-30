const FireVehicle =
require("./fireVehicle.model");

const findAvailableFireVehicles =
async (stationId) => {

  return await FireVehicle.find({

    station: stationId,

    status: "AVAILABLE"

  });

};

module.exports = {

  findAvailableFireVehicles

};