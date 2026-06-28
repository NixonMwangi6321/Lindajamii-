const express = require("express");

const router = express.Router();

const {
  updateDispatchStatus
} = require("./dispatch.controller");

router.patch(
  "/:id/status",
  updateDispatchStatus
);

module.exports = router;