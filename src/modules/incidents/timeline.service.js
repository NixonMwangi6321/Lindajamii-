const IncidentTimeline =
require("./incidentTimeline.model");

const addTimelineEvent =
async (
  incidentId,
  eventType,
  description
) => {

  return await IncidentTimeline.create({
    incident: incidentId,
    eventType,
    description
  });

};

const getTimeline =
async (incidentId) => {

  return await IncidentTimeline.find({
    incident: incidentId
  }).sort({
    createdAt: 1
  });

};

module.exports = {
  addTimelineEvent,
  getTimeline
};