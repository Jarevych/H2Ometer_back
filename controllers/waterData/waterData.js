const Water = require('../../models/water');

const waterData = async (req, res) => {
    try {
        const { userId, day, month} = req.query;

        const today = new Date().getDate();
        const currentMonth = new Date().getMonth() + 1;

        const dayValue = day.toLowerCase() === 'today' ? today : parseInt(day);
        const monthValue = day.toLowerCase() === 'currentMonth' ? today : parseInt(month);

        const waterData = await Water.find({
            ownerId: ownerId,
            day: dayValue,
            month: monthValue
        });

        if(waterData.length === 0) {
            return res.status(404).json({message: 'No data found'})
        }

        res.json({
            ownerId: ownerId,
            day: dayValue,
            month: monthValue,
            waterData 
        })

    } catch (error) {
        console.error(error);
    res.status(500).json({ message: 'Server error' });
    }
}

module.exports = waterData