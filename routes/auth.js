const express = require("express");

const ctrl = require("../controllers/auth");

const { validateBody, authenticate } = require("../middlewares");

const { schemas } = require("../models/user");

const router = express.Router();

router.post("/signin", validateBody(schemas.registerSchema), ctrl.register);

router.post("/signup", validateBody(schemas.loginShema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
