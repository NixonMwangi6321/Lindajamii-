const express =
require("express");

const router =
express.Router();

const {
  getRoute
} =
require("./routing.controller");

router.post(
  "/calculate",
  getRoute
);

module.exports =
router;