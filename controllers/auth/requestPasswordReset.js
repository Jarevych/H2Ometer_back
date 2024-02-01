const jwt = require("jsonwebtoken");

const { HttpError, sendEmail, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/user");

const { JWT_KEY } = process.env;

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, JWT_KEY, { expiresIn: "1h" });
  console.log(token);
  user.passwordResetToken = token;
  await user.save();

  const resetLink = `${process.env.BASE_URL_FRONT}/users/reset-password/${token}`;

  const emailData = {
    to: email,
    subject: "Password Reset",
    html: `
    <h1>Password Reset Instructions</h1>
    <p>Dear user,</p>
    <p>You have requested to reset your password. To do so, please follow the instructions below:</p>
    <ol>
      <li>Click on the following link to reset your password:</li>
      <li><a href="${resetLink}">Reset Your Password</a></li>
    </ol>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Best regards,</p>
    <p>Your Website Team</p>
  `,
  };

  await sendEmail(emailData);

  res.json({
    message: "Email for password reset sent",
  });
};

module.exports = {
  requestPasswordReset: ctrlWrapper(requestPasswordReset),
};
