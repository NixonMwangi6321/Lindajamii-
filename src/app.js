const express = require("express");
const cors = require("cors");
const authRoutes =
require("./modules/auth/auth.routes");

const incidentRoutes =
require("./modules/incidents/incident.routes");

const ambulanceRoutes =
require("./modules/ambulances/ambulance.routes");

const hospitalRoutes =
require("./modules/hospitals/hospital.routes");

const fireStationRoutes =
require(
"./modules/fireStations/fireStation.routes"
);

const policeStationRoutes =
require(
"./modules/policeStations/policeStation.routes"
);

const dashboardRoutes =
require("./modules/dashboard/dashboard.routes");

const routingRoutes =
require("./modules/routing/routing.routes");

const dispatchRoutes =
require("./modules/dispatch/dispatch.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Linda Jamii Backend Running"
  });
});

// Routes
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
"/api/dispatch",
dispatchRoutes
);

app.use(
  "/api/routing",
  routingRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);



module.exports = app;