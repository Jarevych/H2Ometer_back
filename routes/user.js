const express = require("express");

const ctrl = require("../controllers/user/index");

const { authenticate } = require("../middlewares/");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/user", authenticate, upload.single("avatar"), ctrl.addAvatar);


module.exports = router;
