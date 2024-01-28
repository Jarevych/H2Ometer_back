const express = require("express");
const connectDB = require("./configs/database");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');
const HttpError = require("./helpers/httpError");
const  Water  = require("./models/water");
const waterIntakeRouter=require('./routes/waterIntake')

dotenv.config({
  path: path.resolve(__dirname, 'main.env')
});

connectDB();

app.use(cors());

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(morgan(formatsLogger));
app.use(express.json());
app.use(morgan('dev'));

app.use("/api", waterIntakeRouter);


module.exports = app;
