const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const routes = require("./routes.js");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(function(req, res, next){
    req.ejs = {path: req.path};
    next();
});

app.use("/", routes);

app.use(express.static("public"));
app.use(express.static("views"));

module.exports = app;