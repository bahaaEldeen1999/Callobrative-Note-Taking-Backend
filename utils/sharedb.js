var ShareDB = require("sharedb");
var WebSocket = require("ws");
const db = require("sharedb-mongo")(process.env.CONNECTION_STRING_shared);

var WebSocketJSONStream = require("@teamwork/websocket-json-stream");

const backend = new ShareDB({
  db: db,
});
const connection = backend.connect();
module.exports.connection = connection;
module.exports.init = function (server) {
  const wss = new WebSocket.Server({ server: server });
  wss.on("connection", function (ws) {
    const stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });
};

module.exports.createDoc = function (doc) {
  return new Promise(function (resolve) {
    doc.create({ content: "" }, function () {
      resolve();
    });
  });
};
