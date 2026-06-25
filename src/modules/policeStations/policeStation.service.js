const PoliceStation =
require("./policeStation.model");

const createPoliceStation =
async (data) => {

  return await PoliceStation.create(data);

};

const getPoliceStations =
async () => {

  return await PoliceStation.find();

};

module.exports = {
  createPoliceStation,
  getPoliceStations
};