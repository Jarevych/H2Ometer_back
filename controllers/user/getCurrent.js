const { ctrlWrapper } = require("../../helpers");

const getCurrent = async (req, res) => {
  const { email, name, gender, avatar } = req.user;

  res.json({
    email,
    name,
    gender,
    avatar,
  });
};

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
};
