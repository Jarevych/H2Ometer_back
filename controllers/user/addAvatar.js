const { ctrlWrapper } = require("../../helpers");
const User = require("../../models/user");

const addAvatar = async (req, res) => {
  const { _id } = req.user;

  const avatarURL = req.file.path;

  await User.findByIdAndUpdate(_id, { avatar: avatarURL });

  res.json({ message: "Avatar updated successfully", avatarURL });
};

module.exports = {
  addAvatar: ctrlWrapper(addAvatar),
};
