const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { HttpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/user");

const { JWT_KEY } = process.env;

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const payload = jwt.verify(token, JWT_KEY);

  const user = await User.findOne({
    _id: payload.id,
    passwordResetToken: token,
  });

  if (!user) {
    throw HttpError(404, "Invalid or expired token");
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashPassword;

  user.passwordResetToken = null;
  await user.save();

  res.json({
    message: "Password successfully reset",
  });
};

module.exports = {
  resetPassword: ctrlWrapper(resetPassword),
};
