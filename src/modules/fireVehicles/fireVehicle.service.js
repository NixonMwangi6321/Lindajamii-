const FireVehicle =
require("./fireVehicle.model");

const createFireVehicle =
async (data) => {

  return await FireVehicle.create(data);

};

const getAllFireVehicles =
async () => {

  return await FireVehicle.find()

  .populate(
    "station",
    "stationName"
  );

};

const getFireVehicle =
async (id) => {

  return await FireVehicle.findById(id)

  .populate(
    "station",
    "stationName"
  );

};

module.exports = {

  createFireVehicle,

  getAllFireVehicles,

  getFireVehicle

};