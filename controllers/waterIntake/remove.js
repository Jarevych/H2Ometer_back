const Water = require("../../models/water");

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const existingRecord = await Water.findByIdAndDelete(id);

    if (!existingRecord) {
      return res.status(404).json({ message: "No record found" });
    }

    return res.status(204).json({ message: "Record deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
module.exports = remove;
