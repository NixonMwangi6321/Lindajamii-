const express =
require("express");

const router =
express.Router();

const {
  createPoliceStation,
  getPoliceStations
}
=
require("./policeStation.controller");

const authenticate =
require("../../middleware/auth.middleware");

const authorize =
require("../../middleware/role.middleware");

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  createPoliceStation
);

router.get(
  "/",
  authenticate,
  getPoliceStations
);

module.exports = router;