const Water = require('../../models/water');

const createOrUpdateRecord = async (req, res) => {
  try {
    const { time, amount } = req.body;
    const { formattedDate, existingRecord } = req;

    if (amount > 5000) {
      return res.status(400).json({ message: 'The amount of water consumed cannot exceed 5000 ml.' });
  }

    if (existingRecord) {
      existingRecord.waterIntake.push({ time, amount });
      await existingRecord.save();
      return res.status(201).json(existingRecord);
    } else {
      const newRecord = new Water({
        waterIntake: [{ time, amount }],
        day: formattedDate
      });
      await newRecord.save();
      return res.status(201).json(newRecord);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = createOrUpdateRecord;