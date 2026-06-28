const Incident =
require("../incidents/incident.model");

const Ambulance =
require("../ambulances/ambulance.model");

const Hospital =
require("../hospitals/hospital.model");

const FireStation =
require("../fireStations/fireStation.model");

const PoliceStation =
require("../policeStations/policeStation.model");

const getDashboardStats =
async () => {

  const activeIncidents =
  await Incident.countDocuments({
    status: {
      $nin: ["RESOLVED", "CLOSED"]
    }
  });

  const resolvedIncidents =
  await Incident.countDocuments({
    status: "RESOLVED"
  });

  const availableAmbulances =
  await Ambulance.countDocuments({
    status: "AVAILABLE"
  });

  const availableHospitals =
  await Hospital.countDocuments({
    active: true
  });

  const availableFireStations =
  await FireStation.countDocuments({
    active: true
  });

  const availablePoliceStations =
  await PoliceStation.countDocuments({
    active: true
  });

  return {
    activeIncidents,
    resolvedIncidents,
    availableAmbulances,
    availableHospitals,
    availableFireStations,
    availablePoliceStations
  };

};

module.exports = {
  getDashboardStats
};