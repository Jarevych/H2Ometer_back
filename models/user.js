const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { helperMongooseError } = require("../helpers");

const userSchema = new Schema(
  {
    password: {
      type: String,
      select: false,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
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
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [false, "Verify token is required"],
    },
    passwordResetToken: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", helperMongooseError);

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
  password: Joi.string().min(8).max(64),
  oldPassword: Joi.string().min(8).max(64).when('password', {
    is: Joi.exist(),
    then: Joi.required(),
  }),
  email: Joi.string().email(),
  name: Joi.string().max(32),
  waterRate: Joi.number().min(1).max(15000),
  avatarURL: Joi.string(),
  gender: Joi.string().valid('male', 'female', 'other'),
}).when(Joi.object({ password: Joi.exist() }).unknown(), {
  then: Joi.object({
    password: Joi.string().min(8).max(64).required(),
    oldPassword: Joi.string().min(8).max(64).required(),
  }),
});

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64),
});

const forgotPasswordSchema = Joi.object({
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
  forgotPasswordSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
