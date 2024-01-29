const express = require("express");
const router = express.Router();
const {createOrUpdateRecord, deleteRecord, updateRecord} = require("../controllers/waterIntake");
const {getCurrentDate,checkExistingRecord, getRecordById} = require('../middlewares/waterIntake');



router.post('/water-intake', getCurrentDate, checkExistingRecord, createOrUpdateRecord);

router.put('/water-intake/:id', getRecordById, updateRecord);

router.delete('/water-intake/:id', deleteRecord);

module.exports = router;
