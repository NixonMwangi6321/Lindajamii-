const mongoose = require("mongoose");

const dispatchSchema = new mongoose.Schema(
{
  // Incident being handled
  incident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Incident",
    required: true
  },

  // Type of responding resource
  resourceType: {
    type: String,
    enum: [
      "AMBULANCE",
      "FIRE_VEHICLE",
      "POLICE_VEHICLE"
    ],
    required: true
  },

  // ID of the responding resource
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  // Mission associated with this dispatch
  mission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mission",
    default: null
  },

  // Dispatch lifecycle
  status: {
    type: String,
    enum: [
      "PENDING",
      "DISPATCHED",
      "ACCEPTED",
      "EN_ROUTE",
      "ARRIVED_AT_SCENE",
      "TRANSPORTING",
      "AT_DESTINATION",
      "COMPLETED",
      "CANCELLED"
    ],
    default: "PENDING"
  },

  dispatchedAt: {
    type: Date,
    default: Date.now
  },

  acceptedAt: Date,

  enRouteAt: Date,

  arrivedAtSceneAt: Date,

  departedSceneAt: Date,

  arrivedAtDestinationAt: Date,

  completedAt: Date,

  cancelledAt: Date,

  // Estimated travel
  eta: Number,

  distance: Number,

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
  "Dispatch",
  dispatchSchema
);