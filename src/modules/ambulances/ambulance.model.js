const mongoose = require("mongoose");

const ambulanceSchema = new mongoose.Schema(
{
  vehicleCode: {
    type: String,
    required: true,
    unique: true
  },

  providerName: {
    type: String,
    required: true
  },

  crewContact: String,

  // Home/Base Location
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

  // Live GPS Location
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

// Geo index for dispatch queries
ambulanceSchema.index({
  location: "2dsphere"
});

module.exports = mongoose.model(
  "Ambulance",
  ambulanceSchema
);