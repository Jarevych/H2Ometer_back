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

    console.log('Connected to MongoDB: ${connection.connection.host}');
  } catch (error) {
    console.error('Error connecting to MongoDB: ${error.message}');
    process.exit(1);
  }
};

module.exports = connectDB;
