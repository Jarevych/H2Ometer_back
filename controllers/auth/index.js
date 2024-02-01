const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { requestPasswordReset } = require("./requestPasswordReset");
const { resetPassword } = require("./resetPassword");

module.exports = {
  register,
  login,
  logout,
  requestPasswordReset,
  resetPassword,
};
