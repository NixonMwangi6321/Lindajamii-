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

router.post("/", createPoliceStation);

router.get("/", getPoliceStations);

module.exports = router;