const {
  getRoute
} = require("./osrm.service");

const calculateRoute = async (
  origin,
  destination
) => {

  const route = await getRoute(
    origin,
    destination
  );

  if (!route) {
    throw new Error(
      "Unable to calculate route."
    );
  }

  return {

    distance: route.distance,

    duration: route.duration,

    durationMinutes:
      Math.ceil(route.duration / 60),

    geometry: route.geometry,

    legs: route.legs || []

  };

};

module.exports = {
  calculateRoute
};