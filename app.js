const path = require("path");
const fs = require("fs");
const express = require("express");

const app = express();
const port = process.env.PORT || 3001;

app.listen(port, function () {
    console.log(`App listening on port ${port}.`);
  });