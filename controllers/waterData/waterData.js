// const mongoose = require('mongoose');

const Water = require("../../models/water");

const waterData = async (req, res) => {
  try {
    const { day, month } = req.query;
    const { _id: ownerId } = req.user || {};
    const today = new Date().getDate();
    // const currentMonth = new Date().getMonth() + 1;
    console.log('user', req.user)
    const startOfMonth = new Date(`2024-${month}-01T00:00:00Z`);
    // const nextMonth = month === 12 ? 1 : month + 1;
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    const selectedDay = new Date(`2024-${month}-${day}T00:00:00Z`);

    console.log("startOfMonth:", startOfMonth);
    console.log("endOfMonth:", endOfMonth);
    console.log("selectedDay:", selectedDay);
    console.log("ownerId", ownerId);
    const dayValue = day.toLowerCase() === "today" ? today : parseInt(day);
    const monthValue =
      day.toLowerCase() === "currentMonth" ? today : parseInt(month);

    const waterData = await Water.find({
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

    // const dayValue = day.toLowerCase() === "today" ? today : parseInt(day);
    // const monthValue =
    //   day.toLowerCase() === "currentMonth" ? today : parseInt(month);

    // const waterData = await Water.find({
    //   ownerId: ownerId,
    //   day: dayValue,
    //   month: monthValue,
    // });

    if (waterData.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    console.log(waterData);
    res.json({
      ownerId: ownerId,
      day: dayValue,
      month: monthValue,
      waterData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = waterData;
