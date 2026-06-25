const IncidentTimeline =
require("./incidentTimeline.model");

const addTimelineEvent =
async (
  incidentId,
  event,
  description
) => {

  return await IncidentTimeline.create({
    incident: incidentId,
    event,
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