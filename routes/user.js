const express = require("express");

const router = express.Router();

const {
  userUpdateController,
} = require("../controllers/userUpdateController/userUpdateController");

const ctrl = require("../controllers/user");

const { authenticate, upload } = require("../middlewares/");

router.post("/avatar", authenticate, upload.single("avatar"), ctrl.addAvatar);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch("/update", authenticate, userUpdateController);

module.exports = router;
