const express =
require("express");

const router =
express.Router();

const {
  createFireStation,
  getFireStations
}
=
require("./fireStation.controller");

const authenticate =
require("../../middleware/auth.middleware");

const authorize =
require("../../middleware/role.middleware");

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  createFireStation
);

router.get(
  "/",
  authenticate,
  getFireStations
);

module.exports = router;