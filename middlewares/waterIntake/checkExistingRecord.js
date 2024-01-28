const Water = require('../../models/water');

const checkExistingRecord = async (req, res, next) => {
  try {
    const { formattedDate } = req;
    const existingRecord = await Water.findOne({ day: formattedDate });

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