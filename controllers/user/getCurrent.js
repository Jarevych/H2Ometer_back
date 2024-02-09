const { ctrlWrapper } = require("../../helpers");

const getCurrent = async (req, res) => {
  const { email, name, gender, avatar, verify } = req.user;
  console.log(verify);
  res.json({
    email,
    name,
    gender,
    avatar,
    isEmailVerified: verify,
  });
};

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
};
