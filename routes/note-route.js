const router = require("express").Router();
const noteController = require("../controllers/note-controller");
const authentication = require("../utils/authentication");
router.get("/notes", authentication.checkAuth, noteController.getNotes);
router.post("/note", authentication.checkAuth, noteController.addNote);
router.put("/note", authentication.checkAuth, noteController.editNote);
router.post(
  "/note/callobration",
  authentication.checkAuth,
  noteController.getCallbobrationLink
);

module.exports = router;
