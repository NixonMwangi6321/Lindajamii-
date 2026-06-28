const express = require("express");

const router = express.Router();

const authenticate =
require("../../middleware/auth.middleware");

const authorize =
require("../../middleware/role.middleware");

const {
  createIncident,
  getAllIncidents,
  getIncidentByIncidentId,
  getIncidentTimeline,
  updateIncidentStatus
} = require("./incident.controller");

router.post(
  "/",
  authenticate,
  authorize(
    "ADMIN",
    "DISPATCHER"
  ),
  createIncident
);

router.get(
  "/:incidentId",
  authenticate,
  getIncidentByIncidentId
);

router.get(
  "/:incidentId/timeline",
  authenticate,
  getIncidentTimeline
);

router.patch(
  "/:incidentId/status",
  authenticate,
  authorize(
    "ADMIN",
    "DISPATCHER"
  ),
  updateIncidentStatus
);

module.exports = router;