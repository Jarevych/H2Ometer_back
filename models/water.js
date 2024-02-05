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
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    waterIntake: [waterConsumptionSchema],
  },
  { versionKey: false, timestamps: true }
);

dailyWaterSchema.post("save", helperMongooseError);

const Water = model("water", dailyWaterSchema);

module.exports = Water;
