const express = require("express");
const cors = require("cors");

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

module.exports = app;