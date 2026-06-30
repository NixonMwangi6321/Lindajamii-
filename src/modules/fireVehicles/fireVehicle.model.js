const mongoose = require("mongoose");

const fireVehicleSchema =
new mongoose.Schema(
{
  vehicleCode: {
    type: String,
    required: true,
    unique: true
  },

  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FireStation",
    required: true
  },

  vehicleType: {
    type: String,
    enum: [
      "FIRE_ENGINE",
      "RESCUE_TRUCK",
      "WATER_TENDER",
      "LADDER_TRUCK"
    ],
    default: "FIRE_ENGINE"
  },

  crewLeader: {
    type: String,
    default: ""
  },

  crewSize: {
    type: Number,
    default: 0
  },

  equipment: [{
    type: String
  }],

  currentLocation: {

    latitude: {
      type: Number,
      default: 0
    },

    longitude: {
      type: Number,
      default: 0
    },

    heading: {
      type: Number,
      default: 0
    },

    speed: {
      type: Number,
      default: 0
    },

    updatedAt: {
      type: Date,
      default: Date.now
    }

  },

  status: {
    type: String,
    enum: [
      "AVAILABLE",
      "DISPATCHED",
      "OFFLINE",
      "MAINTENANCE"
    ],
    default: "AVAILABLE"
  },

  lastDispatchTime: Date

},
{
  timestamps: true
}
);

module.exports =
mongoose.model(
  "FireVehicle",
  fireVehicleSchema
);