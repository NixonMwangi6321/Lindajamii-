const Dispatch =
require("./dispatch.model");

const Incident =
require("../incidents/incident.model");

const Ambulance =
require("../ambulances/ambulance.model");

const {
  addTimelineEvent
} =
require("../incidents/timeline.service");

const createDispatch =
async (
  incidentId,
  ambulanceId
) => {

  return await Dispatch.create({
    incident: incidentId,
    ambulance: ambulanceId
  });

};

const updateDispatchStatus =
async (
  dispatchId,
  status,
  notes = ""
) => {

const updateDispatchStatus =
async (
  dispatchId,
  status
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

  dispatch.status = status;

  dispatch.updatedAt =
  new Date();

  await dispatch.save();

  return dispatch;

};

  const incident =
  await Incident.findById(
    dispatch.incident
  );

  const ambulance =
  await Ambulance.findById(
    dispatch.ambulance
  );

  dispatch.status = status;
  dispatch.notes = notes;

  switch (status) {

    case "NOTIFIED":

      await addTimelineEvent(
        incident._id,
        "DISPATCH_NOTIFIED",
        "Ambulance crew notified."
      );

      break;

    case "ACCEPTED":

      dispatch.acceptedAt =
      new Date();

      incident.status =
      "DISPATCH_ACCEPTED";

      await addTimelineEvent(
        incident._id,
        "DISPATCH_ACCEPTED",
        "Crew accepted dispatch."
      );

      break;

    case "EN_ROUTE":

      incident.status =
      "EN_ROUTE";

      await addTimelineEvent(
        incident._id,
        "EN_ROUTE",
        "Ambulance is en route."
      );

      break;

    case "ARRIVED":

      dispatch.arrivedAt =
      new Date();

      incident.status =
      "ARRIVED_AT_SCENE";

      await addTimelineEvent(
        incident._id,
        "ARRIVED",
        "Ambulance arrived at scene."
      );

      break;

    case "PATIENT_PICKED":

      incident.status =
      "PATIENT_PICKED";

      await addTimelineEvent(
        incident._id,
        "PATIENT_PICKED",
        "Patient picked for transport."
      );

      break;

    case "AT_HOSPITAL":

      incident.status =
      "AT_HOSPITAL";

      await addTimelineEvent(
        incident._id,
        "AT_HOSPITAL",
        "Patient arrived at hospital."
      );

      break;

    case "COMPLETED":

      dispatch.completedAt =
      new Date();

      incident.status =
      "RESOLVED";

      ambulance.status =
      "AVAILABLE";

      await addTimelineEvent(
        incident._id,
        "INCIDENT_RESOLVED",
        "Incident successfully resolved."
      );

      break;

    case "CANCELLED":

      ambulance.status =
      "AVAILABLE";

      incident.status =
      "CANCELLED";

      await addTimelineEvent(
        incident._id,
        "DISPATCH_CANCELLED",
        "Dispatch cancelled."
      );

      break;

  }

  await dispatch.save();
  await incident.save();
  await ambulance.save();

  return dispatch;

};

module.exports = {
  createDispatch,
  updateDispatchStatus
};