const { Server } =
require("socket.io");

const {

updateVehicleLocation

} =
require("../modules/location/location.service");

let io;

const initializeSocket =
(server) => {

  io =
  new Server(server, {

    cors: {

      origin: "*"

    }

  });

  io.on(
    "connection",
    (socket) => {

      console.log(
        "Vehicle Connected"
      );

      socket.on(

        "vehicleLocation",

        async (data) => {

          try {

            const ambulance =
            await updateVehicleLocation(

              data.ambulanceId,

              data.location

            );

            io.emit(

              "vehicleUpdated",

              ambulance

            );

          }

          catch (error) {

            console.error(
              error.message
            );

          }

        }

      );

    }

  );

};

module.exports = {

  initializeSocket

};