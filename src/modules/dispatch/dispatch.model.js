const mongoose = require("mongoose");

const dispatchSchema = new mongoose.Schema(
{
  incident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Incident",
    required: true
  },

  ambulance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ambulance",
    required: true
  },

status: {
  type: String,
  enum: [
    "PENDING",
    "ACCEPTED",
    "EN_ROUTE",
    "ON_SCENE",
    "COMPLETED"
  ],
  default: "PENDING"
},

  acceptedAt: Date,
  arrivedAt: Date,
  completedAt: Date,

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