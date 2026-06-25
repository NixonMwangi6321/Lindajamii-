const express =
require("express");

const router =
express.Router();

const {
  createHospital,
  getHospitals
}
=
require("./hospital.controller");

router.post("/", createHospital);

router.get("/", getHospitals);

module.exports = router;