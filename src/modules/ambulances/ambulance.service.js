const Ambulance =
require("./ambulance.model");

const createAmbulance =
async (data) => {

  return await Ambulance.create(data);

};

const getAmbulances =
async () => {

  return await Ambulance.find();

};

module.exports = {
  createAmbulance,
  getAmbulances
};