const express = require("express");
const router = express.Router();
const {createOrUpdateRecord, deleteRecord, updateRecord} = require("../controllers/waterIntake");
const {getCurrentDate,checkExistingRecord, getRecordById} = require('../middlewares/waterIntake');
const {authenticate}=require('../middlewares')



router.post('/water-intake',authenticate, getCurrentDate, checkExistingRecord, createOrUpdateRecord);

router.put('/water-intake/:recordId',authenticate, getRecordById, updateRecord);

router.delete('/water-intake/:recordId',authenticate, deleteRecord);

module.exports = router;
