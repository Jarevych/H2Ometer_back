const jwt = require("jsonwebtoken");

const { HttpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/user");
const { sendEmail } = require("../../services");

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (!user.verify) {
    throw HttpError(403, "Email not verified");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });

  user.passwordResetToken = token;
  await user.save();

  const resetLink = `${process.env.BASE_URL_FRONT}/reset-password?token=${token}`;

  const emailData = {
    to: email,
    subject: "H2Ometer Password Reset Instructions",
    html: `
    <h1>Password Reset Instructions</h1>
    <p>Dear H2Ometer User,</p>
    <p>We received a request to reset the password for your H2Ometer account. If you made this request, please follow the instructions below to set a new password:</p>
    <ol>
      <li>Click on the following link to reset your password:</li>
      <li><a href="${resetLink}">Reset Your Password</a></li>
    </ol>
    <p>Please note that this link will expire in 24 hours for your security.</p>
    <p>If you did not request to reset your password, you can safely ignore this email. Your account password will not change.</p>
    <p>Should you have any questions or require further assistance, please do not hesitate to contact our support team.</p>
    <p>Best regards,</p>
    <p>The H2Ometer Team</p>
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
