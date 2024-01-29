const { User } = require("../../models/user");
const { updateSchema } = require("../../models/user").schemas;
const mongoose = require("mongoose");

const userUpdateController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400);
      throw new Error("Invalid userId format");
    }

    const { error } = updateSchema.validate(req.body);

    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
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

module.exports = userUpdateController;
