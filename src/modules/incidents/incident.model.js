const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
{
incidentId: {
type: String,
unique: true
},

reporterName: {
type: String,
required: true
},

phoneNumber: {
type: String,
required: true
},

category: {
type: String,
default: "UNCLASSIFIED"
},

priority: {
type: String,
default: "MEDIUM"
},

description: {
type: String,
required: true
},

location: {
latitude: Number,
longitude: Number,
address: String
},

status: {
  type: String,
  enum: [
    "REPORTED",
    "RESPONDERS_DISPATCHED",
    "EN_ROUTE",
    "ARRIVED_AT_SCENE",
    "PATIENT_PICKED",
    "AT_HOSPITAL",
    "RESOLVED",
    "CLOSED"
  ],
  default: "REPORTED"
},
assignedAmbulance: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Ambulance"
},

assignedHospital: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Hospital"
},
assignedFireStation: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "FireStation"
},
assignedPoliceStation: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "PoliceStation"
}
},
{
timestamps: true
}
);

module.exports =
mongoose.model("Incident", incidentSchema);
