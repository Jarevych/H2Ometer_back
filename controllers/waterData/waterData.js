const { ctrlWrapper } = require("../../helpers");
const Water = require("../../models/water");

const waterData = async (req, res) => {
  try {
    const { day, month } = req.query;
    const { _id: ownerId } = req.user || {};
    const today = new Date().getDate();
    const startOfMonth = new Date(`2024-${month}-01T00:00:00Z`);
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    const selectedDay = new Date(`2024-${month}-${day}T00:00:00Z`);
    const dailyNorma = req.user.waterRate;
    const dayValue = day.toLowerCase() === "today" ? today : parseInt(day);
    const monthValue =
      day.toLowerCase() === "currentMonth" ? today : parseInt(month);

    const drunkedWater = await Water.find({
      ownerId,
      $or: [
        {
          createdAt: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
        },
        {
          createdAt: {
            $gte: selectedDay,
            $lt: new Date(selectedDay.getTime() + 24 * 60 * 60 * 1000),
          },
        },
      ],
    });

    if (waterData.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    console.log(drunkedWater);
    res.json({
      dailyNorma,
      ownerId: ownerId,
      day: dayValue,
      month: monthValue,
      drunkedWater,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { waterData: ctrlWrapper(waterData) };
