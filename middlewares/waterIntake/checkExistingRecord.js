const Water = require('../../models/water');

const checkExistingRecord = async (req, res, next) => {
  try {
    const { formattedDate } = req;
    const { _id: ownerId } = req.user;
    const existingRecord = await Water.findOne({ day: formattedDate,ownerId });

    if (existingRecord) {
      req.existingRecord = existingRecord;
    }

    next();
  } catch (error) {
   res.status(500).json({ message: 'Server error' });
  }
};

module.exports = checkExistingRecord;