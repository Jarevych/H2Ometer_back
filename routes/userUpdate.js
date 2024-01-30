const express = require("express");
const router = express.Router();
const verifyToken = require("..//middlewares/verifyToken");
const userUpdate = require("..//controllers/userUpdateController/userUpdateController");

router.patch("/:userId", verifyToken, userUpdate);

module.exports = router;
