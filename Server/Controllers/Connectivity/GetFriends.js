const User = require("../../Models/User");

async function getFriends(req, res) {
    try {
        const { userId } = req.params;
        try {
            const friends = await User.findById(userId).populate('friends')
            res.status(200).json(friends.friends)
        } catch (err) {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }

}
module.exports = getFriends;