const {
  getIO
} =
require("../../socket/socket");

const Mission =
require("./mission.model");

const generateMissionId =
require("../../utils/generateMissionId");

const createMission =
async (data) => {

  const mission =
  await Mission.create({

    missionId:
    generateMissionId(),

    ...data

  });

  // Notify all connected dashboards
  getIO().emit(
    "mission-created",
    mission
  );

  return mission;

};

const getMission =
async (missionId) => {

  return await Mission.findOne({

    missionId

  })

  .populate(
    "incident"
  )

  .populate(
    "ambulance"
  )

  .populate(
    "fireVehicle"
  )

  .populate(
    "policeVehicle"
  )

  .populate(
    "hospital"
  )

  .populate(
    "fireStation"
  )

  .populate(
    "policeStation"
  );

};

const getActiveMissions =
async () => {

  return await Mission.find({

    status: {

      $nin: [

        "COMPLETED",

        "CANCELLED"

      ]

    }

  })

  .populate(
    "incident"
  )

  .populate(
    "ambulance",
    "vehicleCode status currentLocation"
  )

  .populate(
    "fireVehicle",
    "vehicleCode vehicleType status currentLocation"
  )

  .populate(
    "policeVehicle",
    "vehicleCode vehicleType status currentLocation"
  )

  .populate(
    "hospital",
    "name"
  )

  .populate(
    "fireStation",
    "stationName"
  )

  .populate(
    "policeStation",
    "stationName"
  )

  .sort({

    createdAt: -1

  });

};

const updateMissionStatus =
async (
  missionId,
  status
) => {

  const mission =
  await Mission.findOne({

    missionId

  });

  if (!mission) {

    throw new Error(
      "Mission not found"
    );

  }

  mission.status =
  status;

  switch (status) {

    case "ACTIVE":

      mission.startedAt =
      new Date();

      break;

    case "ON_SCENE":

      break;

    case "TRANSPORTING":

      break;

    case "AT_HOSPITAL":

      break;

    case "COMPLETED":

      mission.completedAt =
      new Date();

      break;

    case "CANCELLED":

      mission.cancelledAt =
      new Date();

      break;

    default:
      break;

  }

  await mission.save();

  // Notify clients watching this mission
  getIO()

    .to(
      `mission:${mission.missionId}`
    )

    .emit(
      "mission-status-updated",
      mission
    );

  // Update dashboard overview
  getIO().emit(
    "mission-updated",
    mission
  );

  return mission;

};

module.exports = {

  createMission,

  getMission,

  getActiveMissions,

  updateMissionStatus

};