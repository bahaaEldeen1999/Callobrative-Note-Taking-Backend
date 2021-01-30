const authentication = require("../utils/authentication");
const { userModel } = require("../models/user");

async function addNote(req, res) {
  try {
    const userId = req.user._id;
    const { title, body } = req.body;
    if (!title || !body) throw new Error("error");
    const user = await userModel.findOne({ _id: userId });
    user.notes.push({
      title: title,
      body: body,
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
