const authentication = require("../utils/authentication");
const { userModel } = require("../models/user");
const shareDBConnection = require("../utils/sharedb").connection;
const createShareDBDoc = require("../utils/sharedb").createDoc;
const uuid = require("uuid");
async function createNote(req, res) {
  try {
    const userId = req.user._id;
    const user = await userModel.findOne({ _id: userId });
    const noteIdBody = uuid.v1();
    const noteIdTitle = uuid.v1();
    let docBody = shareDBConnection.get("notes", noteIdBody);
    let docTitle = shareDBConnection.get("notes", noteIdTitle);
    await createShareDBDoc(docBody);
    await createShareDBDoc(docTitle);
    user.notes.push({
      bodyId: noteIdBody,
      titleId: noteIdTitle,
    });
    user.markModified("notes");
    await user.save();
    res.status(201).json({
      bodyId: noteIdBody,
      titleId: noteIdTitle,
    });
  } catch (ex) {
    res.status(400).send("error").end();
  }
}

async function getNotes(req, res) {
  try {
    const userId = req.user._id;
    const user = await userModel.findOne({ _id: userId });
    let notes = [];
    for (let note of user.notes) notes.push(note);
    res.status(200).json({ notes: notes }).end();
  } catch (ex) {
    res.status(400).send("error").end();
  }
}

async function getCallbobrationLink(req, res) {
  try {
    const userId = req.user._id;
    const { noteIndx } = req.body;
    const user = await userModel.findOne({ _id: userId });
    user.notes[noteIndx].isCallob = true;
    user.markModified("notes");
    await user.save();
    const url =
      req.protocol +
      "://" +
      req.get("host") +
      req.originalUrl +
      "/req?linkid=" +
      String(noteIndx) +
      "&uid=" +
      userId;
    res.status(200).send(url).end();
  } catch (ex) {
    res.status(400).send("error").end();
  }
}
async function getNoteCallob(req, res) {
  try {
    const noteIndx = req.query.linkid;
    const userId = req.query.uid;
    const user = await userModel.findOne({ _id: userId });
    if (user.notes[noteIndx].isCallob) {
      const bodyId = user.notes[noteIndx].bodyId;
      const titleId = user.notes[noteIndx].titleId;
      res.redirect(
        process.env.FRONT_END +
          "note.html?bodyId=" +
          bodyId +
          "&titleId=" +
          titleId
      );
    } else throw new Error("error");
  } catch (ex) {
    console.log(ex);
    res.status(400).send("error").end();
  }
}
module.exports = {
  createNote,
  getNotes,
  getCallbobrationLink,
  getNoteCallob,
};
