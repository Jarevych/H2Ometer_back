const express = require("express");
const connectDB = require("./configs/database");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

const path = require("path");
const HttpError = require("./helpers/httpError");
const Water = require("./models/water");
const waterIntakeRouter = require("./routes/waterIntake");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const path = require('path');
const HttpError = require("./helpers/HttpError");
const  Water  = require("./models/water");
const waterIntakeRouter=require('./routes/waterIntake')


dotenv.config({
  path: path.resolve(__dirname, "main.env"),
});

const waterRate = require("./routes/waterRate");

const authRouter = require("./routes/auth");

const userRouter = require("./routes/user");

const updateRouter = require("./routes/userUpdate");

connectDB();

app.use(cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", waterIntakeRouter);

app.use("/users", authRouter);
app.use("/users", userRouter);
app.use("/waterrate", waterRate);
app.use("/users/update", updateRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
