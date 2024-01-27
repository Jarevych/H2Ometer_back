const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
    });

    console.log(`Connected to MongoDB: ${connection.connection.host}`);
	@@ -13,4 +19,4 @@ const connectDB = async () => {
  }
};

module.exports = connectDB;
