const path = require("path");
const fs = require("fs");
const express = require("express");

const app = express();
const port = process.env.PORT || 3001;
const pFolder = path.join(__dirname, "/public");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function (req, res) {
    res.sendFile(path.join(pFolder, "notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(pFolder, "index.html"));
});

app.post("/api/notes", function (req, res) {
    console.log('Note received for creation');
    console.log('req.body = ', req.body);

    let notesInDb = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let createNote = req.body;

    let createID = notesInDb.length.toString();
    createNote.id = createID;
    notesInDb.push(createNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(notesInDb));
    res.json(notesInDb);
});

app.listen(port, function () {
    console.log(`App listening on port ${port}.`);
});