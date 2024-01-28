const User = require('../../models/user');

const updWaterRate = async(req, res) => {
    try {
        const { id} = req.params;
        const updateRate = await User.findByIdAndUpdate(
            id, 
            {$set: req.body},
            {new: true},
        )
        res.json(updateRate)
    } catch (error) {
        res.status(500).json({ error: "Помилка при отриманні даних" });
    }
};

module.exports = updWaterRate