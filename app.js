import sequelize from "./config/db.js";
import Barber from "./models/barber.js";
import User from "./models/user.js";
import Booking from "./models/booking.js";
import Service from "./models/service.js";
await sequelize.sync({ alter: true });

import express from "express";
import bodyParser from "body-parser";
import routes from "./routes.js";

const app = express();

app.use(bodyParser.json());
app.set("view engine", "ejs");

app.use(function(req, res, next){
    req.ejs = {path: req.path};
    next();
});

app.use("/", routes);

app.use(express.static("public"));
app.use(express.static("views"));

export default app;