const express = require("express");
const connectDB = require("./configs/database");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, "main.env"),
});

const app = express();

const authRouter = require("./routes/auth");

dotenv.config({
  path: path.resolve(__dirname, "main.env"),
});

connectDB();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(morgan(formatsLogger));

app.use(cors());
app.use(express.json());

app.use("/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
