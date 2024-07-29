const User = require("../../Models/User");

async function getUser(req, res) {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
}

module.exports = { getUser };