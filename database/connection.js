const mongoose = require("mongoose");
module.exports = function () {
  mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.once("open", function () {
    console.log("connected to " + process.env.CONNECTION_STRING);
  });
};
