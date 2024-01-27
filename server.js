const mongoose = require("mongoose");

const app = require(".");

const { MONGO_URL, PORT = 3001 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

module.exports = app;
