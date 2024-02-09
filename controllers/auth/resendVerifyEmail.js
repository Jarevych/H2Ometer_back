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
    subject: "Complete Your H2Ometer Registration",
    html: `
    <p>Hello,</p>
    <p>Thank you for signing up for H2Ometer, the innovative app designed to help you monitor your water usage and save on your bills. We're excited to have you on board!</p>
    <p>To get started, please verify your email address by clicking the link below:</p>
    <a target="_blank" href="${process.env.BASE_URL_FRONT}/verify?token=${user.verificationToken}">Verify Email</a>
    <p>This ensures that we have your correct email address and can communicate important information about your account.</p>
    <p>If you did not sign up for a H2Ometer account, please disregard this message. No further action is required on your part.</p>
    <p>Warm regards,</p>
    <p>The H2Ometer Team</p>
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
