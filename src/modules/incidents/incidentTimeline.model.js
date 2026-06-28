const mongoose = require("mongoose");

const timelineSchema =
new mongoose.Schema({

  incident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Incident",
    required: true
  },

  eventType: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  }

},
{
  timestamps: true
});

module.exports =
mongoose.model(
  "Timeline",
  timelineSchema
);