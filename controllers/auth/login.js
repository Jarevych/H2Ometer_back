const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
    },
  });
};

const googleAuth = async(req, res) => {
  const {_id: id} = req.user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.redirect(`http://localhost:3000/home?token=${token}`)
}



module.exports = {
  login: ctrlWrapper(login),
  googleAuth: ctrlWrapper(googleAuth),
};
