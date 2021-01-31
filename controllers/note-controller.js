const authentication = require("../utils/authentication");
const { userModel } = require("../models/user");
const shareDBConnection = require("../utils/sharedb").connection;

async function addNote(req, res) {
  try {
    const userId = req.user._id;
    const { title, body, Id } = req.body;
    if (!title || !body || !Id) throw new Error("error");
    const user = await userModel.findOne({ _id: userId });
    user.notes.push({
      id: Id,
    });
    user.markModified("notes");
    await user.save();
    res.status(201).send("created");
  } catch (ex) {
    res.status(400).send("error").end();
  }
}

async function editNote(req, res) {
  try {
    const userId = req.user._id;
    const { noteIndx, title, body } = req.body;
    if (!title || !body) throw new Error("error");
    const user = await userModel.findOne({ _id: userId });
    user.notes[noteIndx] = {
      title: title,
      body: body,
    };
    user.markModified("notes");
    await user.save();
    res.status(200).send("edited");
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
    const { noteIndx, socketId } = req.body;
    const user = await userModel.findOne({ _id: userId });
    user.notes[noteIndx].isCallob = true;
    user.notes[noteIndx].socketId = socketId;
    const url =
      req.protocol +
      "://" +
      req.get("host") +
      req.originalUrl +
      "?userid=" +
      String(userId) +
      "&noteid=" +
      String(noteIndx);
    res.status(200).send(url).end();
  } catch (ex) {
    res.status(400).send("error").end();
  }
}

module.exports = {
  getNotes,
  addNote,
  editNote,
  getCallbobrationLink,
};
