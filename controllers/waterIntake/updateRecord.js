const Water=require('../../models/water')

const updateRecord = async (req, res) => {
    try {
      const { time, amount } = req.body;
      const existingRecord = req.existingRecord;
  
      existingRecord.waterIntake = [{ time, amount }];
      await existingRecord.save();
  
      return res.status(200).json(existingRecord);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = updateRecord;