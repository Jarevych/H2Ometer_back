const Water = require('../../models/water');

const checkExistingRecord = async (req, res, next) => {
  try {
    const { formattedDate } = req;
    const { _id: ownerID } = req.user;
    const existingRecord = await Water.findOne({ day: formattedDate,ownerID });

    if (existingRecord) {
      req.existingRecord = existingRecord;
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = checkExistingRecord;