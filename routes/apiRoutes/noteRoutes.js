const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const { notes } = require("../../db/notes");
const { v4: uuidv4 } = require("uuid");

// Get all notes
router.get("/notes", (req, res) => {
  res.json(notes);
});

// Post new note
router.post("/notes", (req, res) => {
  const note = req.body;
  note.id = uuidv4();
  notes.push(note);

  fs.writeFileSync(
    path.join(__dirname, "../../db/notes.json"),
    JSON.stringify({ notes: notes })
  );

  res.json(note);
});

// Delete a note by id
router.delete("/notes/:id", (req, res) => {
  let noteIndex = notes.findIndex((note) => note.id === req.params.id);

  let deletedNote = notes.splice(noteIndex, 1);

  fs.writeFileSync(
    path.join(__dirname, "../../db/notes.json"),
    JSON.stringify({ notes: notes })
  );

  res.json(deletedNote);
});

module.exports = router;
