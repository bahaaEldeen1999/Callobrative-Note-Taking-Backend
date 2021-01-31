require("dotenv").config();
const app = require("express")();
require("./database/connection")();
const bodyParser = require("body-parser");
const userRouter = require("./routes/user-routes");
const noteRoutes = require("./routes/note-route");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/user", userRouter);
app.use("/api/note", noteRoutes);
app.listen(process.env.PORT || 3000, () => {
  console.log(`application is running on port ${process.env.PORT || 3000}`);
});
