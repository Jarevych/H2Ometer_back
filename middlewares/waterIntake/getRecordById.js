const mongoose = require('mongoose');
const Water = require('../../models/water');

const getRecordById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { _id: ownerId } = req.user;

    const existingRecord = await Water.findOne({ 'waterIntake._id': mongoose.Types.ObjectId(id), ownerId});

    if (!existingRecord) {
      return res.status(404).json({ message: 'No record found' });
    }

    req.existingRecord = existingRecord;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = getRecordById;