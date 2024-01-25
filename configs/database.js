const mongoose = require('mongoose');
const dotenv = require('dotenv')

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
    });

    console.log(`Connected to MongoDB: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;