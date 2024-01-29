const Water = require('../../models/water');
const mongoose = require('mongoose');

// const deleteRecord = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const existingRecord = await Water.findByIdAndDelete(id);

//     if (!existingRecord) {
//       return res.status(404).json({ message: "No record found" });
//     }

//     return res.status(204).json({ message: "Record deleted" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = deleteRecord;


const deleteRecord = async (req, res) => {
  try {
    const recordId = req.params.id;

    const existingRecord = await Water.findOne({ 'waterIntake._id': mongoose.Types.ObjectId(recordId) });

    if (!existingRecord) {
      console.log('No record found');
      return res.status(404).json({ message: 'No record found' });
    }

    const updatedWaterIntake = existingRecord.waterIntake.filter(item => item._id.toString() !== recordId);

    existingRecord.waterIntake = updatedWaterIntake;
    
    await existingRecord.save();

    return res.status(200).json(existingRecord);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = deleteRecord;