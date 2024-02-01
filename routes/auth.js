const express = require("express");

const ctrl = require("../controllers/auth");

const { validateBody, authenticate } = require("../middlewares");

const { schemas } = require("../models/user");

const router = express.Router();

router.post("/signup", validateBody(schemas.registerSchema), ctrl.register);

router.post("/signin", validateBody(schemas.loginShema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.post(
  "/forgot-password",
  validateBody(schemas.emailSchema),
  ctrl.requestPasswordReset
);

router.post(
  "/reset-password/:token",
  validateBody(schemas.newPasswordSchema),
  ctrl.resetPassword
);

module.exports = router;
