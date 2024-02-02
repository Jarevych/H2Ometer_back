const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { requestPasswordReset } = require("./requestPasswordReset");
const { resetPassword } = require("./resetPassword");
const { verifyEmail } = require("./verifyEmail");
const { resendVerifyEmail } = require("./resendVerifyEmail.js");

module.exports = {
  register,
  login,
  logout,
  requestPasswordReset,
  resetPassword,
  verifyEmail,
  resendVerifyEmail,
};
