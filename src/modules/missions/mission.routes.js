const express =
require("express");

const router =
express.Router();

const {

  getMission,

  getActiveMissions,

  updateMissionStatus

} =
require("./mission.controller");

router.get(
  "/",
  getActiveMissions
);

router.get(
  "/:missionId",
  getMission
);

router.patch(
  "/:missionId/status",
  updateMissionStatus
);

module.exports =
router;