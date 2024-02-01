const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    gender: {
      type: String,
      enum: ["female", "male"],
    },
    name: {
      type: String,
      maxlength: 32,
    },
    waterRate: {
      type: Number,
      min: 1,
      max: 15000,
      default: 2,
    },
    token: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
    },
    verifyToken: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().min(8).max(64).required(),
  email: Joi.string().email().required(),
  name: Joi.string().max(32),
});

const loginShema = Joi.object({
  password: Joi.string().min(8).max(64).required(),
  email: Joi.string().email().required(),
});

const updateSchema = Joi.object({
  password: Joi.string().min(8).max(64).required(),
  email: Joi.string().email(),
  name: Joi.string().max(32),
  waterRate: Joi.number().min(1).max(15000),
  avatarURL: Joi.string(),
});

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const newPasswordSchema = Joi.object({
  newPassword: Joi.string().min(8).max(64).required(),
});

const schemas = {
  registerSchema,
  loginShema,
  updateSchema,
  emailSchema,
  newPasswordSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
