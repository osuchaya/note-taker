const path = require("path");
const fs = require("fs");
const express = require("express");
// const uuid = require("uuid");

const app = express();
const port = process.env.PORT || 3001;
const pFolder = path.join(__dirname, "/public");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function (req, res) {   // get /notes from front-end (notes.html)
    res.sendFile(path.join(pFolder, "notes.html")); //send notes.html to front-end. 
});

app.get("/api/notes", function (req, res) {     // got /api/notes from front-end
    res.sendFile(path.join(__dirname, "/db/db.json")); //send /notes available in db.json to front-end
});

app.get("*", function (req, res) {                  //catch-all other than /api/notes received
    res.sendFile(path.join(pFolder, "index.html"));  //send index.html to front-end
});

app.post("/api/notes", function (req, res) {         //got post request for route /api/notes from front-end
    console.log('Note received for creation');
    console.log('req.body = ', req.body);            //req.body = new notes

    let notesInDb = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));    //read all current notes from db.json and store in an array
    let createNote = req.body;                       //create a new object and store body contents there

    let createID = notesInDb.length.toString();
    // let createID = uuid()
    createNote.id = createID;
    notesInDb.push(createNote);



    fs.writeFileSync("./db/db.json", JSON.stringify(notesInDb));
    res.json(notesInDb);
});

app.listen(port, function () {
    console.log(`App listening on port ${port}.`);
});