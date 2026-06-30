require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

/* ===========================
   Middleware
=========================== */

app.use(cors());

app.use(express.json());

/* ===========================
   Route Imports
=========================== */

const authRoutes =
require("./modules/auth/auth.routes");

const incidentRoutes =
require("./modules/incidents/incident.routes");

const ambulanceRoutes =
require("./modules/ambulances/ambulance.routes");

const hospitalRoutes =
require("./modules/hospitals/hospital.routes");

const fireStationRoutes =
require("./modules/fireStations/fireStation.routes");

const policeStationRoutes =
require("./modules/policeStations/policeStation.routes");

const dispatchRoutes =
require("./modules/dispatch/dispatch.routes");

const routingRoutes =
require("./modules/routing/routing.routes");

const missionRoutes =
require("./modules/missions/mission.routes");

const fireVehicleRoutes =
require("./modules/fireVehicles/fireVehicle.routes");

const trackingRoutes =
require("./modules/tracking/tracking.routes");

const dashboardRoutes =
require("./modules/dashboard/dashboard.routes");

/* ===========================
   Root Endpoint
=========================== */

app.get("/", (req, res) => {

  res.json({

    success: true,

    application: "Linda Jamii",

    version: "1.0.0",

    message: "Emergency Response Backend Running"

  });

});

/* ===========================
   Health Check
=========================== */

app.get("/health", (req, res) => {

  res.status(200).json({

    success: true,

    status: "OK",

    message: "Linda Jamii Backend Running"

  });

});

/* ===========================
   API Routes
=========================== */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/incidents",
  incidentRoutes
);

app.use(
  "/api/ambulances",
  ambulanceRoutes
);

app.use(
  "/api/hospitals",
  hospitalRoutes
);

app.use(
  "/api/fire-stations",
  fireStationRoutes
);

app.use(
  "/api/police-stations",
  policeStationRoutes
);

app.use(
  "/api/fire-vehicles",
  fireVehicleRoutes
);

app.use(
  "/api/dispatch",
  dispatchRoutes
);

app.use(
  "/api/missions",
  missionRoutes
);

app.use(
  "/api/routing",
  routingRoutes
);

app.use(
  "/api/tracking",
  trackingRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

/* ===========================
   404 Handler
=========================== */

app.use((req, res) => {

  res.status(404).json({

    success: false,

    message: "Route not found."

  });

});

/* ===========================
   Global Error Handler
=========================== */

app.use((err, req, res, next) => {

  console.error(err);

  res.status(err.status || 500).json({

    success: false,

    message:
      err.message || "Internal Server Error"

  });

});

/* ===========================
   Export App
=========================== */

module.exports = app;