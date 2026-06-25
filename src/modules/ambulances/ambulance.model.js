const mongoose = require("mongoose");

const ambulanceSchema =
new mongoose.Schema(
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

ambulanceSchema.index({
location: "2dsphere"
});

module.exports =
mongoose.model(
"Ambulance",
ambulanceSchema
);
