const { Schema, model } = require("mongoose");
const helperMongooseError = require("../helpers/helperMongooseError");
// const Joi = require("joi");

const waterConsumptionSchema = new Schema({
  time: { type: String, required: true },
  amount: { type: Number, required: true },
});

const dailyWaterSchema = new Schema(
  {
    day: { type: String },
    ownerID: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    waterIntake: [waterConsumptionSchema],
  },
  { versionKey: false, timestamps: true }
);

dailyWaterSchema.post("save", helperMongooseError);

// const joiSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
//   favorite: Joi.boolean(),
// });

// const favoriteSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// });

// const schemas = {
//   joiSchema,
//   favoriteSchema,
// };

const Water = model("water", dailyWaterSchema);

module.exports = Water;
