const { Server } =
require("socket.io");

let io = null;

const initializeSocket =
(server) => {

  io = new Server(server, {

    cors: {

      origin: "*",

      methods: [

        "GET",

        "POST",

        "PATCH"

      ]

    }

  });

  io.on(
    "connection",
    (socket) => {

      console.log(
        `🟢 Client connected: ${socket.id}`
      );

      // Join a mission room
      socket.on(
        "join-mission",
        (missionId) => {

          socket.join(
            `mission:${missionId}`
          );

          console.log(
            `📍 ${socket.id} joined mission:${missionId}`
          );

        }
      );

      // Leave a mission room
      socket.on(
        "leave-mission",
        (missionId) => {

          socket.leave(
            `mission:${missionId}`
          );

          console.log(
            `📤 ${socket.id} left mission:${missionId}`
          );

        }
      );

      // Disconnect
      socket.on(
        "disconnect",
        () => {

          console.log(
            `🔴 Client disconnected: ${socket.id}`
          );

        }
      );

    }
  );

};

const getIO = () => {

  if (!io) {

    throw new Error(
      "Socket.IO has not been initialized."
    );

  }

  return io;

};

module.exports = {

  initializeSocket,

  getIO

};