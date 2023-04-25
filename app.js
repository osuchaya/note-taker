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
  
app.listen(port, function () {
    console.log(`App listening on port ${port}.`);
  });