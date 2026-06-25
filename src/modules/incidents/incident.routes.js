const express = require("express");

const router = express.Router();

const {
  createIncident
}
=
require("./incident.controller");

router.post("/", createIncident);

module.exports = router;