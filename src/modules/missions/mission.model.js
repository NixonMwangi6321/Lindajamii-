const mongoose = require("mongoose");

const missionSchema =
new mongoose.Schema({

  missionId: {
    type: String,
    unique: true
  },

  // Linked Incident
  incident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Incident",
    required: true
  },

  // Responding Resources
  ambulance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ambulance"
  },

  fireVehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FireVehicle"
  },

  policeVehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PoliceVehicle"
  },

  // Supporting Facilities
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital"
  },

  fireStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FireStation"
  },

  policeStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PoliceStation"
  },

  // Mission Metrics
  priority: {
    type: String,
    enum: [
      "LOW",
      "MEDIUM",
      "HIGH",
      "CRITICAL"
    ],
    default: "MEDIUM"
  },

  eta: {
    type: Number,
    default: null
  },

  distance: {
    type: Number,
    default: null
  },

  // Mission Lifecycle
  status: {
    type: String,
    enum: [
      "CREATED",
      "DISPATCHED",
      "ACTIVE",
      "ON_SCENE",
      "TRANSPORTING",
      "AT_HOSPITAL",
      "COMPLETED",
      "CANCELLED"
    ],
    default: "CREATED"
  },

  startedAt: {
    type: Date,
    default: Date.now
  },

  completedAt: Date,

  cancelledAt: Date,

  // Dispatcher Notes
  notes: {
    type: String,
    default: ""
  }

},
{
  timestamps: true
});

module.exports =
mongoose.model(
  "Mission",
  missionSchema
);