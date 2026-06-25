const mongoose =
require("mongoose");

const dispatchSchema =
new mongoose.Schema(
{
  incident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Incident",
    required: true
  },

  ambulance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ambulance"
  },

  status: {
    type: String,
    enum: [
      "PENDING",
      "ASSIGNED",
      "EN_ROUTE",
      "ARRIVED",
      "COMPLETED"
    ],
    default: "ASSIGNED"
  }
},
{
  timestamps: true
}
);

module.exports =
mongoose.model(
  "Dispatch",
  dispatchSchema
);