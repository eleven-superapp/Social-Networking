const User = require("../../Models/User");

async function editUser(req, res) {
    try {
        const { username, profilePicture, bio, preferences } = req.body;
        const { userId } = req.params;
        const user = await User.findByIdAndUpdate(userId, { username, profilePicture, bio, preferences }, { new: true }).then((user) => {
            return res.status(200).json(user);
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: e.message });
    }
}

module.exports = { editUser }