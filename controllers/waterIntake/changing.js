const Water = require("../../models/water");

const changing = async (req, res) => {
  try {
    const { time, amount } = req.body;
    const id = req.params.id;

    const existingRecord = await DailyWaterConsumption.findById(id);

    if (!existingRecord) {
      return res.status(404).json({ message: "No record found" });
    }

    existingRecord.waterIntake = [{ time, amount }];

    await existingRecord.save();

    return res.status(200).json(existingRecord);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
module.exports = changing;
