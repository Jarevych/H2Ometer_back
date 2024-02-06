const { User } = require("../../models/user");
const { updateSchema } = require("../../models/user").schemas;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ctrlWrapper } = require("../../helpers");

const userUpdateController = async (req, res, next) => {
  try {
    const { _id } = req.user;
    console.log(_id)
    const userId = req.user._id
    oldUserPassword = req.user.password
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400);
      throw new Error("Invalid userId format");
    }

    const { error } = updateSchema.validate(req.body);

    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }

    const { oldPassword, password } = req.body;

    if(oldPassword) {
      const oldPasswordCompare = await bcrypt.compare(oldPassword, oldUserPassword);
      if(!oldPasswordCompare) {
        res.status(401);
        throw new Error("Old password is incorrect");
      }
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      res.status(404);
      throw new Error(`User with ID ${userId} not found`);
    }

    res.status(200).json({
      code: 200,
      data: updatedUser,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      error: error.message || "Internal Server Error",
    });
  }
};

module.exports = {userUpdateController: ctrlWrapper(userUpdateController)};
