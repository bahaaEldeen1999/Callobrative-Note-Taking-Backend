const authentication = require("../utils/authentication");

const router = require("express").Router();
const userController = require("../controllers/user-controller");
router.post("/login", userController.login);

router.post("/signup", userController.signup);
module.exports = router;
