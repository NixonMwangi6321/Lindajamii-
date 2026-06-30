const {
  selectBestAmbulance
} =
require("../routing/assetSelection.service");

const {
  findNearestHospital
} =
require("../hospitals/hospitalGeo.service");

const {
  findNearestPoliceStation
} =
require("../policeStations/policeStationGeo.service");

const {
  dispatchFireVehicle
} =
require("../fireVehicles/fireDispatch.service");

const dispatchResources =
async (
  category,
  longitude,
  latitude
) => {

  const resources = {};

  const incidentLocation = {
    latitude,
    longitude
  };

  switch (category) {

    case "MEDICAL":

      resources.ambulance =
      await selectBestAmbulance(
        incidentLocation
      );

      resources.hospital =
      await findNearestHospital(
        longitude,
        latitude
      );

      break;

    case "ACCIDENT":

      resources.ambulance =
      await selectBestAmbulance(
        incidentLocation
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

      resources.fireVehicle =
      await dispatchFireVehicle(
        longitude,
        latitude
      );

      resources.hospital =
      await findNearestHospital(
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

      resources.ambulance =
      await selectBestAmbulance(
        incidentLocation
      );

      resources.fireVehicle =
      await dispatchFireVehicle(
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

    default:

      throw new Error(
        "Unsupported incident category"
      );

  }

  return resources;

};

module.exports = {
  dispatchResources
};