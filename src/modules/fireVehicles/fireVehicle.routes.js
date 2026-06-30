const express =
require("express");

const router =
express.Router();

const {

  createFireVehicle,

  getAllFireVehicles

} =
require("./fireVehicle.controller");

router.post(
  "/",
  createFireVehicle
);

router.get(
  "/",
  getAllFireVehicles
);

module.exports =
router;