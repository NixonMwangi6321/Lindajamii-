const calculateResponseTime =
(incident) => {

  if (
    !incident.dispatchTime ||
    !incident.arrivalTime
  ) {
    return null;
  }

  return Math.round(
    (
      incident.arrivalTime -
      incident.dispatchTime
    ) / 60000
  );

};

module.exports =
calculateResponseTime;