const axios = require("axios");

const getRoute = async (
  origin,
  destination
) => {

  const url =

`https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`;

  const response =
  await axios.get(url);

  return response.data.routes[0];

};

module.exports = {
  getRoute
};