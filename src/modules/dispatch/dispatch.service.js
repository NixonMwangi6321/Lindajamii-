const {
getIO
} =
require("../../socket/socket");
const Dispatch =
require("./dispatch.model");

const Incident =
require("../incidents/incident.model");

const Ambulance =
require("../ambulances/ambulance.model");

const FireVehicle =
require("../fireVehicles/fireVehicle.model");

const {
  addTimelineEvent
} =
require("../incidents/timeline.service");

const createDispatch =
async ({
  incident,
  resourceType,
  resource,
  mission = null,
  eta = null,
  distance = null
}) => {

  return await Dispatch.create({

    incident,

    resourceType,

    resource,

    mission,

    eta,

    distance

  });

};

const updateDispatchStatus =
async (
  dispatchId,
  status,
  notes = ""
) => {

  const dispatch =
  await Dispatch.findById(
    dispatchId
  );

  if (!dispatch) {
    throw new Error(
      "Dispatch not found"
    );
  }

  const incident =
  await Incident.findById(
    dispatch.incident
  );

  if (!incident) {
    throw new Error(
      "Incident not found"
    );
  }

  let resource = null;

  switch (dispatch.resourceType) {

    case "AMBULANCE":

      resource =
      await Ambulance.findById(
        dispatch.resource
      );

      break;

    case "FIRE_VEHICLE":

      resource =
      await FireVehicle.findById(
        dispatch.resource
      );

      break;

    case "POLICE_VEHICLE":

      // We'll implement this module later
      break;

  }

  dispatch.status = status;
  dispatch.notes = notes;

  switch (status) {

    case "ACCEPTED":

      dispatch.acceptedAt =
      new Date();

      await addTimelineEvent(

        incident._id,

        "DISPATCH_ACCEPTED",

        `${dispatch.resourceType} accepted dispatch.`

      );

      break;

    case "EN_ROUTE":

      dispatch.enRouteAt =
      new Date();

      incident.status =
      "EN_ROUTE";

      await addTimelineEvent(

        incident._id,

        "EN_ROUTE",

        `${dispatch.resourceType} en route.`

      );

      break;

    case "ARRIVED_AT_SCENE":

      dispatch.arrivedAtSceneAt =
      new Date();

      incident.status =
      "ARRIVED_AT_SCENE";

      await addTimelineEvent(

        incident._id,

        "ARRIVED_AT_SCENE",

        `${dispatch.resourceType} arrived at scene.`

      );

      break;

    case "TRANSPORTING":

      dispatch.departedSceneAt =
      new Date();

      incident.status =
      "PATIENT_PICKED";

      await addTimelineEvent(

        incident._id,

        "TRANSPORTING",

        "Patient transport started."

      );

      break;

    case "AT_DESTINATION":

      dispatch.arrivedAtDestinationAt =
      new Date();

      incident.status =
      "AT_HOSPITAL";

      await addTimelineEvent(

        incident._id,

        "AT_DESTINATION",

        "Arrived at destination."

      );

      break;

    case "COMPLETED":

      dispatch.completedAt =
      new Date();

      incident.status =
      "RESOLVED";

      if (resource) {

        resource.status =
        "AVAILABLE";

        resource.lastDispatchTime =
        new Date();

      }

      await addTimelineEvent(

        incident._id,

        "MISSION_COMPLETED",

        `${dispatch.resourceType} completed mission.`

      );

      break;

    case "CANCELLED":

      dispatch.cancelledAt =
      new Date();

      incident.status =
      "CANCELLED";

      if (resource) {

        resource.status =
        "AVAILABLE";

      }

      await addTimelineEvent(

        incident._id,

        "DISPATCH_CANCELLED",

        "Dispatch cancelled."

      );

      break;

    default:
      break;

  }

  await dispatch.save();
  await incident.save();
  getIO()

.to(

`mission:${dispatch.incident}`

)

.emit(

"dispatch-updated",

dispatch

);

  if (resource) {
    await resource.save();
  }

  return dispatch;

};

module.exports = {

  createDispatch,

  updateDispatchStatus

};