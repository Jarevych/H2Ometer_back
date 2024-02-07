const express = require("express");

const ctrl = require("../controllers/auth");

const { validateBody, authenticate, passport } = require("../middlewares");

const { schemas } = require("../models/user");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }, ctrl.googleAuth)
);

router.post("/signup", validateBody(schemas.registerSchema), ctrl.register);

router.post("/signin", validateBody(schemas.loginShema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/forgot-password",
  validateBody(schemas.forgotPasswordSchema),
  ctrl.requestPasswordReset
);

router.post(
  "/reset-password/:token",
  validateBody(schemas.newPasswordSchema),
  ctrl.resetPassword
);

module.exports = router;
