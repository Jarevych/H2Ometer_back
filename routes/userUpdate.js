const express = require("express");
const router = express.Router();
const { verifyToken } = require("..//middlewares/verifyToken");
const userUpdateController = require("../controllers/userUpdateController/userUpdateController");

router.patch("/:userId", verifyToken, userUpdateController);

module.exports = router;
