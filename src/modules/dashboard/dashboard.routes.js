const express = require("express");

const router = express.Router();
const authenticate =
require("../../middleware/auth.middleware");

const authorize =
require("../../middleware/role.middleware");

const {
  getDashboardStats
} = require("./dashboard.controller");

router.get(
  "/stats",
  authenticate,
  authorize(
    "ADMIN",
    "DISPATCHER"
  ),
  getDashboardStats
);
module.exports = router;