require("dotenv").config();

const http =
require("http");

const app =
require("./src/app");

const connectDB =
require("./src/config/db");

const {
  initializeSocket
} =
require("./src/socket/socket");

connectDB();

const PORT =
process.env.PORT || 5000;

const server =
http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {

  console.log(
    `🚀 Linda Jamii Backend running on port ${PORT}`
  );

});