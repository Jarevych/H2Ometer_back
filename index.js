const express = require('express');
const connectDB = require('./configs/database');
const app = express();
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.envs/production.env' : './envs/development.env'
  });

connectDB();

app.use(cors())

app.use(morgan('dev'));
app.use(express.json());


module.exports = app