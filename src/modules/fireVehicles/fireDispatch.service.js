const {
  findNearestFireStation
} =
require("../fireStations/fireStationGeo.service");

const {
  findAvailableFireVehicles
} =
require("./fireVehicleGeo.service");

const {
  calculateRoute
} =
require("../routing/routing.service");

const dispatchFireVehicle =
async (
  longitude,
  latitude
) => {

  const station =
  await findNearestFireStation(

    longitude,

    latitude

  );

  if (!station) {

    return null;

  }

  const vehicles =

  await findAvailableFireVehicles(

    station._id

  );

  if (!vehicles.length) {

    return null;

  }

  const candidates = [];

  for (const vehicle of vehicles) {

    try {

      const route =

      await calculateRoute(

        {

          latitude:
          vehicle.currentLocation.latitude,

          longitude:
          vehicle.currentLocation.longitude

        },

        {

          latitude,

          longitude

        }

      );

      candidates.push({

        vehicle,

        eta:
        route.duration,

        distance:
        route.distance,

        geometry:
        route.geometry

      });

    } catch (error) {

      console.log(

        error.message

      );

    }

  }

  candidates.sort(

    (a,b)=>

    a.eta-b.eta

  );

  return candidates[0];

};

module.exports={

dispatchFireVehicle

};