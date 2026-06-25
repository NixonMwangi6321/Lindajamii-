const mongoose = require("mongoose");

const policeStationSchema =
new mongoose.Schema(
{
  stationName: {
    type: String,
    required: true
  },

  contactNumber: String,

  availableOfficers: {
    type: Number,
    default: 0
  },

  availableVehicles: {
    type: Number,
    default: 0
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },

    coordinates: {
      type: [Number],
      required: true
    }
  },

  active: {
    type: Boolean,
    default: true
  }
},
{
  timestamps: true
}
);

policeStationSchema.index({
  location: "2dsphere"
});

module.exports =
mongoose.model(
  "PoliceStation",
  policeStationSchema
);