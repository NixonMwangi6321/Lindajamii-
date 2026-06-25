const express = require("express");

const router = express.Router();

const {
createAmbulance,
getAmbulances
} = require("./ambulance.controller");

router.post("/", createAmbulance);

router.get("/", getAmbulances);

module.exports = router;
