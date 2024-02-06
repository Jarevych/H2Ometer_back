const { HttpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/user");
const { sendEmail } = require("../../services");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(400, "missing required field email");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `
    <p>Hello,</p>
    <p>Thank you for registering. Please click the link below to verify your email address:</p>
    <a target="_blank" href="${process.env.BASE_URL_FRONT}/verify?token=${user.verificationToken}">Verify Email</a>
    <p>If you did not create an account, no further action is required.</p>
    <p>Regards,<br>Your Team</p>
  `,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = {
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
