const Water=require('../../models/water')

const updateRecord = async (req, res) => {
  try {
    const recordId = req.params.id;
   
    const { time, amount } = req.body;

    const existingRecord = req.existingRecord;

    if (!existingRecord) {
      return res.status(404).json({ message: 'No record found' });
    }

    const updatedWaterIntake = existingRecord.waterIntake.map(item =>
      item._id.toString() === recordId ? { ...item, time, amount } : item
    );

    existingRecord.waterIntake = updatedWaterIntake;

    await existingRecord.save();

    return res.status(200).json(existingRecord);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
  
  module.exports = updateRecord;