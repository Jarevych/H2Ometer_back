const express = require("express");
const router = express.Router();
const {createOrUpdateRecord, deleteRecord, updateRecord} = require("../controllers/waterIntake");
const {getCurrentDate,checkExistingRecord, getRecordById} = require('../middlewares/waterIntake');
const {authenticate}=require('../middlewares')
const {waterData} = require("../controllers/waterData/waterData");



router.post('/water-intake',authenticate, getCurrentDate, checkExistingRecord, createOrUpdateRecord);

router.put('/water-intake/:id',authenticate, getRecordById, updateRecord);

router.delete('/water-intake/:id',authenticate, deleteRecord);

router.get("/water-data", authenticate, waterData);

module.exports = router;
