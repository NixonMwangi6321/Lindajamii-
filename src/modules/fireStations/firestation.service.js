const FireStation =
require("./fireStation.model");

const createFireStation =
async (data) => {

  return await FireStation.create(data);

};

const getFireStations =
async () => {

  return await FireStation.find();

};

module.exports = {
  createFireStation,
  getFireStations
};