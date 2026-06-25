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

router.post("/", createFireStation);

router.get("/", getFireStations);

module.exports = router;