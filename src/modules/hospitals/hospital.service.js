const Hospital =
require("./hospital.model");

const createHospital =
async (data) => {

  return await Hospital.create(data);

};

const getHospitals =
async () => {

  return await Hospital.find();
};

module.exports = {
  createHospital,
  getHospitals
};