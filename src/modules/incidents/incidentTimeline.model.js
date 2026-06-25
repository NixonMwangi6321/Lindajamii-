const mongoose = require("mongoose");

const incidentTimelineSchema = new mongoose.Schema(
{
  incident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Incident",
    required: true
  },

  event: {
    type: String,
    required: true
  },

  description: String
},
{
  timestamps: true
}
);

module.exports =
mongoose.model(
  "IncidentTimeline",
  incidentTimelineSchema
);