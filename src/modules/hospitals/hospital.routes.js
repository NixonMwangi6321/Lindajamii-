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
const authenticate =
require("../../middleware/auth.middleware");

const authorize =
require("../../middleware/role.middleware");

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  createHospital
);

router.get(
  "/",
  authenticate,
  getHospitals
);

module.exports = router;