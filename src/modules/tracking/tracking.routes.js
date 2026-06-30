const express =
require("express");

const router =
express.Router();

const {

  updateVehicleLocation

} =
require("./tracking.controller");

// Update Ambulance GPS
router.patch(

  "/ambulance/location",

  updateVehicleLocation

);

module.exports =
router;