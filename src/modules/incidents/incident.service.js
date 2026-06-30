const {
  getIO
} = require("../../socket/socket");

const Incident = require("./incident.model");

const generateIncidentId =
require("../../utils/generateIncidentId");

const classifyIncident =
require("../../ai/classifier.service");

const calculatePriority =
require("../../ai/priority.service");

const {
  addTimelineEvent,
  getTimeline
} =
require("./timeline.service");

const {
  dispatchResources
} =
require("../dispatch/dispatchRules.service");

const {
  createDispatch
} =
require("../dispatch/dispatch.service");

const {
  createMission
} =
require("../missions/mission.service");

const calculateResponseTime =
require("../../utils/responseTime");



const createIncident =
async (data) => {

  // Generate Incident ID
  data.incidentId =
  generateIncidentId();

  // AI Classification
  data.category =
  classifyIncident(
    data.description
  );

  // AI Priority
  data.priority =
  calculatePriority(
    data.description
  );

  // Create Incident
  const incident =
  await Incident.create(data);

  // Timeline
  await addTimelineEvent(
    incident._id,
    "REPORT_RECEIVED",
    "Emergency report submitted."
  );

  await addTimelineEvent(
    incident._id,
    "AI_CLASSIFICATION",
    `Classified as ${incident.category}`
  );

  // Dispatch Resources
  const resources =
  await dispatchResources(
    incident.category,
    data.location.longitude,
    data.location.latitude
  );

  // ==========================
  // Ambulance Assignment
  // ==========================
  if (resources.ambulance) {

    const selected =
    resources.ambulance;

    incident.assignedAmbulance =
    selected.ambulance._id;

    incident.estimatedArrivalTime =
    selected.eta;

    incident.routeDistance =
    selected.distance;

    incident.routeGeometry =
    selected.geometry;

    selected.ambulance.status =
    "DISPATCHED";

    selected.ambulance.lastDispatchTime =
    new Date();

    await selected.ambulance.save();

    await createDispatch({

  incident: incident._id,

  resourceType: "AMBULANCE",

  resource: selected.ambulance._id

});

    await addTimelineEvent(
      incident._id,
      "AMBULANCE_ASSIGNED",
      `${selected.ambulance.vehicleCode}`
    );

  }

  // ==========================
  // Hospital Assignment
  // ==========================
  if (resources.hospital) {

    incident.assignedHospital =
    resources.hospital._id;

    await addTimelineEvent(
      incident._id,
      "HOSPITAL_RECOMMENDED",
      resources.hospital.name
    );

  }

  // ==========================
  // Fire Station Assignment
  // ==========================
if (resources.fireVehicle) {

  const selected =
  resources.fireVehicle;

  incident.assignedFireVehicle =
  selected.vehicle._id;

  incident.assignedFireStation =
  selected.vehicle.station;

  selected.vehicle.status =
  "DISPATCHED";

  selected.vehicle.lastDispatchTime =
  new Date();

  await selected.vehicle.save();
  await createDispatch({

  incident: incident._id,

  resourceType: "FIRE_VEHICLE",

  resource: selected.vehicle._id

});
  await addTimelineEvent(
    incident._id,
    "FIRE_VEHICLE_ASSIGNED",
    selected.vehicle.vehicleCode
  );

}

  // ==========================
  // Police Assignment
  // ==========================
  if (resources.police) {

    incident.assignedPoliceStation =
    resources.police._id;

    await addTimelineEvent(
      incident._id,
      "POLICE_ASSIGNED",
      resources.police.stationName
    );

  }

await incident.save();

// Create Mission
try {

  await createMission({

    incident:
    incident._id,

    ambulance:
    incident.assignedAmbulance,

    hospital:
    incident.assignedHospital,

    fireStation:
    incident.assignedFireStation,

    fireVehicle:
    incident.assignedFireVehicle,

    policeStation:
    incident.assignedPoliceStation,

    eta:
    incident.estimatedArrivalTime,

    distance:
    incident.routeDistance

  });

} catch (error) {

  console.error(
    "Mission creation failed:",
    error.message
  );

}

await addTimelineEvent(
  incident._id,
  "DISPATCH_COMPLETED",
  "Automatic resource assignment completed."
);

getIO().emit(
  "incident-created",
  incident
);

return incident;
};

const getIncidentTimeline =
async (incidentId) => {

  const incident =
  await Incident.findOne({
    incidentId
  });

  if (!incident) {
    throw new Error(
      "Incident not found"
    );
  }

  return await getTimeline(
    incident._id
  );

};

const getIncidentByIncidentId =
async (incidentId) => {

  const incident =
  await Incident.findOne({
    incidentId
  })
  .populate(
    "assignedAmbulance",
    "vehicleCode providerName status"
  )
  .populate(
    "assignedHospital",
    "name phone address"
  )
  .populate(
    "assignedFireStation",
    "stationName contactNumber"
  )
  .populate(
  "assignedFireVehicle",
  "vehicleCode vehicleType status"
)
  .populate(
    "assignedPoliceStation",
    "stationName contactNumber"
  );

  if (!incident) {
    return null;
  }

  const responseTime =
  calculateResponseTime(
    incident
  );

  return {
    incident,
    responseTime
  };

};

const updateIncidentStatus =
async (
  incidentId,
  status
) => {

  const incident =
  await Incident.findOne({
    incidentId
  });

  if (!incident) {
    throw new Error(
      "Incident not found"
    );
  }

  incident.status = status;

  switch (status) {

    case "DISPATCHED":
      incident.dispatchTime =
      new Date();
      break;

    case "ON_SCENE":
      incident.arrivalTime =
      new Date();
      break;

    case "RESOLVED":
      incident.resolvedTime =
      new Date();
      break;

    default:
      break;

  }

  await incident.save();

  getIO().emit(
    "incident-status-updated",
    incident
  );

  await addTimelineEvent(
    incident._id,
    "STATUS_UPDATED",
    `Status changed to ${status}`
  );

  return incident;

};

const getAllIncidents =
async (query) => {

  const filter = {};

  if (query.status) {
    filter.status = query.status;
  }

  if (query.priority) {
    filter.priority = query.priority;
  }

  if (query.category) {
    filter.category = query.category;
  }

  return await Incident.find(filter)
    .populate(
      "assignedAmbulance",
      "vehicleCode providerName"
    )
    .populate(
      "assignedHospital",
      "name"
    )
    .populate(
      "assignedFireStation",
      "stationName"
    )
    .populate(
  "assignedFireVehicle",
  "vehicleCode vehicleType"
)
    .populate(
      "assignedPoliceStation",
      "stationName"
    )
    .sort({
      createdAt: -1
    });

};

module.exports = {
  createIncident,
  getAllIncidents,
  getIncidentByIncidentId,
  getIncidentTimeline,
  updateIncidentStatus
};