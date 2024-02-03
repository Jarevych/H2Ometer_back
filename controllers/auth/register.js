const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");
const { HttpError, ctrlWrapper} = require("../../helpers");
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
    subject: "Verify email",
    html: `
    <p>Hello,</p>
    <p>Thank you for registering. Please click the link below to verify your email address:</p>
    <a target="_blank" href="${process.env.BASE_URL_FRONT}/users/verify/${verificationToken}">Verify Email</a>
    <p>If you did not create an account, no further action is required.</p>
    <p>Regards,<br>Your Team</p>
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
