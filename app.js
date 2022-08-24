import sequelize from "./config/db.js";
import Barber from "./models/barber.js";
import User from "./models/user.js";
import Booking from "./models/booking.js";
import Service from "./models/service.js";
await sequelize.sync({ alter: false });

import express from "express";
import bodyParser from "body-parser";
import routes from "./routes.js";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.set("view engine", "ejs");

app.use(function(req, res, next){
    req.ejs = {path: req.path};
    next();
});

app.use(cors({origin: '*'}));

app.use("/", routes);

app.use(express.static("public"));
app.use(express.static("views"));

export default app;