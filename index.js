const express = require("express");
const connectDB = require("./configs/database");
const app = express();

const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const waterRate = require("./routes/waterRate");

const authRouter = require("./routes/auth");

const userRouter = require("./routes/user");

dotenv.config({
  path: path.resolve(__dirname, "main.env"),
});

connectDB();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(morgan(formatsLogger));
app.use(cors());

app.use(express.json());

app.use("/users", authRouter);
app.use("/users", userRouter);
app.use("/waterrate", waterRate);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
