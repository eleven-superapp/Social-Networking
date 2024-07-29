const User = require("../../Models/User");

async function createUser(req, res) {
    try {
        const { username, profilePicture, bio, preferences } = req.body;
        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        } else {
            const newUser = new User({
                username, bio, profilePicture,  preferences
            })
            await newUser.save().then((user) => {
                res.status(201).json(user);
            })
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Server Error' });
        return;
    }
}
module.exports = { createUser }