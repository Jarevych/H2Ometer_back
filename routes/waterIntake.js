const express = require("express");
const router = express.Router();
const {createOrUpdateRecord, deleteRecord, updateRecord} = require("../controllers/waterIntake");
const {getCurrentDate,checkExistingRecord, getRecordById} = require('../middlewares/waterIntake');
const {authenticate}=require('../middlewares')



router.post('/water-intake',authenticate, getCurrentDate, checkExistingRecord, createOrUpdateRecord);

router.put('/water-intake/:id',authenticate, getRecordById, updateRecord);

router.delete('/water-intake/:id',authenticate, deleteRecord);

module.exports = router;
