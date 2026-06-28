const express = require("express");

const router = express.Router();

const {
  createIncident,
  getAllIncidents,
  getIncidentByIncidentId,
  getIncidentTimeline,
  updateIncidentStatus
} = require("./incident.controller");

router.post("/", createIncident);

router.get("/", getAllIncidents);

router.get(
  "/:incidentId",
  getIncidentByIncidentId
);

router.get(
  "/:incidentId/timeline",
  getIncidentTimeline
);

router.patch(
  "/:incidentId/status",
  updateIncidentStatus
);

module.exports = router;