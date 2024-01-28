const express = require('express');
const connectDB = require('./configs/database');
const app = express();
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path');
const waterRate = require('./routes/waterRate')


dotenv.config({
    path: path.resolve(__dirname, 'main.env')
  });

connectDB();

app.use(cors())

app.use(morgan('dev'));
app.use(express.json());


app.use('./api', waterRate)

module.exports = app