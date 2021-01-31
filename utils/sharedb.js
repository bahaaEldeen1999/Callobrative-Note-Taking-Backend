const ShareDB = require("sharedb");
const WebSocket = require("ws");
const db = require("sharedb-mongo")(process.env.CONNECTION_STRING_shared);

const WebSocketJSONStream = require("@teamwork/websocket-json-stream");

const backend = new ShareDB({
  db: db,
});
const connection = backend.connect();
module.exports.connection = connection;
module.exports.init = function (server) {
  const wss = new WebSocket.Server({ server: server }, () => {
    //console.log("socket", wss.path);
  });

  wss.on("connection", function (ws) {
    const stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
    // console.log("socket", ws.url);
  });
};

module.exports.createDoc = function (doc) {
  return new Promise(function (resolve) {
    doc.create({ content: "" }, function () {
      resolve();
    });
  });
};
