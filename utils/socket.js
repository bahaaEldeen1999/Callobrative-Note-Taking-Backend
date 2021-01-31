module.exports = async function (app) {
  const http = require("http").Server(app);
  const io = require("socket.io")(http);
  io.on("connection", (socket) => {
    console.log("socket connection");
  });
};
