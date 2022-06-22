const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const index = require("./routes/index");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use("/", index);

app.use(express.static("public"));
app.use(express.static("views"));

module.exports = app;