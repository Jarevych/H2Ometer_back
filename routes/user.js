const express = require("express");

const router = express.Router();

const ctrl = require("../controllers/user");

const { authenticate, upload } = require("../middlewares/");

router.post("/avatar", authenticate, upload.single("avatar"), ctrl.addAvatar);

router.get("/current", authenticate, ctrl.getCurrent);

module.exports = router;
