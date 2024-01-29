const jwt = require("jsonwebtoken");
const { User } = require("..//models/user");

const verifyToken = async (userToken) => {
  if (!userToken) {
    throw { status: 401, message: "Access denied. Token not provided" };
  }

  try {
    const decoded = jwt.verify(userToken, process.env.JWT_KEY);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw { status: 401, message: "Access denied. Invalid user" };
    }

    return user;
  } catch (error) {
    throw { status: 401, message: "Access denied. Invalid token" };
  }
};

module.exports = { verifyToken };
