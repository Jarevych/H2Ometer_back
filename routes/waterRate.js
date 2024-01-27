const express = require('express');

const router = express.Router
const updWaterRate = require('../controllers/waterRate/waterRate')


router.patch("./waterrate", updWaterRate)