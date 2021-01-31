const authentication = require("../utils/authentication");
const { userModel } = require("../models/user");
const shareDBConnection = require("../utils/sharedb").connection;
const createShareDBDoc = require("../utils/sharedb").createDoc;
const uuid = require("uuid");
async function createNote(req, res) {
  try {
    const userId = req.user._id;
    const user = await userModel.findOne({ _id: userId });
    const noteId = uuid.v1();
    let doc = shareDBConnection.get("notes", noteId);
    await createShareDBDoc(doc);
    user.notes.push({
      id: noteId,
    });
    user.markModified("notes");
    await user.save();
    res.status(201).send(noteId);
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
    if (user.notes[noteIndx].isCallob)
      res.status(200).send(user.notes[noteIndx].id).end();
    else throw new Error("error");
  } catch (ex) {
    res.status(400).send("error").end();
  }
}
module.exports = {
  createNote,
  getNotes,
  getCallbobrationLink,
  getNoteCallob,
};
