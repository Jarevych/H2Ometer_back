const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");
const { sendEmail } = require("../../services");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
  });

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

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
