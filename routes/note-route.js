const router = require("express").Router();
const noteController = require("../controllers/note-controller");
const authentication = require("../utils/authentication");
router.get("/notes", authentication.checkAuth, noteController.getNotes);
router.post("/note", authentication.checkAuth, noteController.createNote);
router.post(
  "/note/callobration",
  authentication.checkAuth,
  noteController.getCallbobrationLink
);
router.get("/note/callobration/req", noteController.getNoteCallob);

module.exports = router;
