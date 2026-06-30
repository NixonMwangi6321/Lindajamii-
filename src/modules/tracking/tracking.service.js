const Ambulance = require("../ambulances/ambulance.model");
const Mission = require("../missions/mission.model");

const {
  calculateRoute
} = require("../routing/routing.service");

const {
  getIO
} = require("../../socket/socket");

const updateLocation = async (
  vehicleCode,
  latitude,
  longitude,
  speed = 0,
  heading = 0
) => {

  // ============================
  // Find Ambulance
  // ============================

  const ambulance = await Ambulance.findOne({
    vehicleCode
  });

  if (!ambulance) {
    throw new Error("Ambulance not found");
  }

  // ============================
  // Update Live GPS
  // ============================

  ambulance.currentLocation = {
    latitude,
    longitude,
    speed,
    heading,
    updatedAt: new Date()
  };

  ambulance.location.coordinates = [
    longitude,
    latitude
  ];

  await ambulance.save();

  // ============================
  // Broadcast Fleet Update
  // ============================

  getIO().emit(
    "fleet-location-updated",
    {
      resourceType: "AMBULANCE",
      vehicleCode,
      location: ambulance.currentLocation
    }
  );

  // ============================
  // Find Active Mission
  // ============================

  const activeMission = await Mission.findOne({
    ambulance: ambulance._id,
    status: {
      $nin: [
        "COMPLETED",
        "CANCELLED"
      ]
    }
  }).populate("incident");

  if (!activeMission) {
    return ambulance;
  }

  // ============================
  // Save Last Known Position
  // ============================

  activeMission.lastKnownLocation = {
    latitude,
    longitude,
    updatedAt: new Date()
  };

  // ============================
  // Recalculate ETA
  // ============================

  if (activeMission.incident) {

    try {

      const route =
      await calculateRoute(

        {
          latitude,
          longitude
        },

        {
          latitude:
          activeMission.incident.location.latitude,

          longitude:
          activeMission.incident.location.longitude
        }

      );

      activeMission.eta =
      route.duration;

      activeMission.distance =
      route.distance;

      await activeMission.save();

      // ========================
      // Mission Room Update
      // ========================

      getIO()

      .to(
        `mission:${activeMission.missionId}`
      )

      .emit(
        "eta-updated",
        {
          missionId:
          activeMission.missionId,

          eta:
          activeMission.eta,

          distance:
          activeMission.distance
        }
      );

      // ========================
      // Auto Arrival Detection
      // ========================

      if (
        route.distance <= 100 &&
        activeMission.status === "ACTIVE"
      ) {

        activeMission.status =
        "ON_SCENE";

        await activeMission.save();

        getIO()

        .to(
          `mission:${activeMission.missionId}`
        )

        .emit(
          "mission-status-updated",
          activeMission
        );

      }

    } catch (error) {

      console.error(
        "Route calculation failed:",
        error.message
      );

    }

  }

  return ambulance;

};

module.exports = {
  updateLocation
};