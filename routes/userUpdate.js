const express = require("express");
const router = express.Router();
// const verifyToken = require("..//middlewares/verifyToken");
const userUpdate = require("..//controllers/userUpdateController/userUpdateController");
const { authenticate } = require("../middlewares");

router.patch("/update", authenticate, userUpdate);

module.exports = router;
