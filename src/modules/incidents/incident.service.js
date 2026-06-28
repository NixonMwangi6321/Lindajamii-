const {
  getIO
} =
require("../../socket/socket");
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

  // Ambulance
  if (resources.ambulance) {

    incident.assignedAmbulance =
    resources.ambulance._id;

    resources.ambulance.status =
    "DISPATCHED";

    resources.ambulance.lastDispatchTime =
    new Date();

    await resources.ambulance.save();

    await createDispatch(
      incident._id,
      resources.ambulance._id
    );

    await addTimelineEvent(
      incident._id,
      "AMBULANCE_ASSIGNED",
      `${resources.ambulance.vehicleCode}`
    );

  }

  // Hospital
  if (resources.hospital) {

    incident.assignedHospital =
    resources.hospital._id;

    await addTimelineEvent(
      incident._id,
      "HOSPITAL_RECOMMENDED",
      `${resources.hospital.name}`
    );

  }

  // Fire Station
  if (resources.fireStation) {

    incident.assignedFireStation =
    resources.fireStation._id;

    await addTimelineEvent(
      incident._id,
      "FIRE_STATION_ASSIGNED",
      `${resources.fireStation.stationName}`
    );

  }

  // Police Station
  if (resources.police) {

    incident.assignedPoliceStation =
    resources.police._id;

    await addTimelineEvent(
      incident._id,
      "POLICE_ASSIGNED",
      `${resources.police.stationName}`
    );

  }

  await incident.save();

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