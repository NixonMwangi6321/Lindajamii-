const {
  findNearestAmbulance
} =
require("../../utils/geoDistance");

const {
  findNearestHospital
} =
require("../hospitals/hospitalGeo.service");

const {
  findNearestFireStation
} =
require("../fireStations/fireStationGeo.service");

const {
  findNearestPoliceStation
} =
require("../policeStations/policeStationGeo.service");

const dispatchResources =
async (
  category,
  longitude,
  latitude
) => {

  const resources = {};

  switch (category) {

    case "MEDICAL":

      resources.ambulance =
      await findNearestAmbulance(
        longitude,
        latitude
      );

      resources.hospital =
      await findNearestHospital(
        longitude,
        latitude
      );

      break;

    case "ACCIDENT":

      resources.ambulance =
      await findNearestAmbulance(
        longitude,
        latitude
      );

      resources.hospital =
      await findNearestHospital(
        longitude,
        latitude
      );

      resources.police =
      await findNearestPoliceStation(
        longitude,
        latitude
      );

      break;

    case "FIRE":

      resources.fireStation =
      await findNearestFireStation(
        longitude,
        latitude
      );

      resources.ambulance =
      await findNearestAmbulance(
        longitude,
        latitude
      );

      break;

    case "CRIME":

      resources.police =
      await findNearestPoliceStation(
        longitude,
        latitude
      );

      break;

    case "DISASTER":

      resources.fireStation =
      await findNearestFireStation(
        longitude,
        latitude
      );

      resources.ambulance =
      await findNearestAmbulance(
        longitude,
        latitude
      );

      resources.hospital =
      await findNearestHospital(
        longitude,
        latitude
      );

      resources.police =
      await findNearestPoliceStation(
        longitude,
        latitude
      );

      break;
  }

  return resources;
};

module.exports = {
  dispatchResources
};