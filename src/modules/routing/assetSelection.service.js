const Ambulance =
require("../ambulances/ambulance.model");

const {
  calculateRoute
} =
require("./routing.service");

const selectBestAmbulance =
async (incidentLocation) => {

  const ambulances =
  await Ambulance.find({
    status: "AVAILABLE"
  });

  if (!ambulances.length) {
    return null;
  }

  const candidates = [];

  for (const ambulance of ambulances) {

    const origin = {

      latitude:
      ambulance.currentLocation.latitude,

      longitude:
      ambulance.currentLocation.longitude

    };

    const destination = {

      latitude:
      incidentLocation.latitude,

      longitude:
      incidentLocation.longitude

    };

    try {

      const route =
      await calculateRoute(
        origin,
        destination
      );

      candidates.push({

        ambulance,

        eta:
        route.duration,

        distance:
        route.distance,

        geometry:
        route.geometry

      });

    } catch (error) {

      console.log(
        `Unable to calculate route for ${ambulance.vehicleCode}`
      );

    }

  }

  candidates.sort(
    (a, b) => a.eta - b.eta
  );

  return candidates[0];

};

module.exports = {
  selectBestAmbulance
};