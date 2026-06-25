const mongoose = require("mongoose");

const fireStationSchema =
new mongoose.Schema(
{
  stationName: {
    type: String,
    required: true
  },

  contactNumber: String,

  availableEngines: {
    type: Number,
    default: 1
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

fireStationSchema.index({
  location: "2dsphere"
});

module.exports =
mongoose.model(
  "FireStation",
  fireStationSchema
);