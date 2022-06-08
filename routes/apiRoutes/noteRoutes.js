const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const { notes } = require("../../db/notes");
const { v4: uuidv4 } = require("uuid");

router.get("/notes", (req, res) => {
  res.json(notes);
});

router.post("/notes", (req, res) => {
  const note = req.body;
  note._id = uuidv4();
  notes.push(note);

  fs.writeFileSync(
    path.join(__dirname, "../../db/notes.json"),
    JSON.stringify({ notes: notes })
  );

  res.json(note);
});

module.exports = router;
