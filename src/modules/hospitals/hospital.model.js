const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  phone: String,

  address: String,

  emergencyCapacity: {
    type: Number,
    default: 0
  },

  availableBeds: {
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

hospitalSchema.index({
  location: "2dsphere"
});

module.exports =
mongoose.model(
  "Hospital",
  hospitalSchema
);