require("dotenv").config();
const app = require("express")();

app.listen(process.env.PORT || 3000, () => {
  console.log(`application is running on port ${process.env.PORT || 3000}`);
});
