const express = require("express");
const router = express.Router();
const waterData = require("../controllers/waterData/waterData");
const authenticate = require("../middlewares/autenticate");

router.get("/water-data", authenticate, waterData);

module.exports = router;
