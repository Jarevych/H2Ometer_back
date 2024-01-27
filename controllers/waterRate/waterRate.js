const User = require("./")


const updWaterRate = async(req, res) => {
    try {
        const {id} = req.params;
        const updWaterRate = await User.findByIdAndUpdate(
            id, 
            { $set: req.body },
            { new: true }
            );

            res.json(updWaterRate)
    } catch (error) {
        res.status(500).json({ error: "Помилка при отриманні даних" });
    }
}



module.exports = updWaterRate;