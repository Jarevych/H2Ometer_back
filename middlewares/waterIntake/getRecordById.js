const Water = require('../../models/water');

const getRecordById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const existingRecord = await Water.findById(id);

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