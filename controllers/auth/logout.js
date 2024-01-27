const { ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/user");

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });

  res.status(200).json({
    message: "Logout success",
  });
};

module.exports = {
  logout: ctrlWrapper(logout),
};
