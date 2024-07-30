const User = require("../../Models/User");

async function deleteUser(req, res) {
    try {
        if (!req.params.userId) {
            return res.status(400).json({ message: 'User ID is required' });
        } else {
            const user = await User.findByIdAndDelete(req.params.userId);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json({ message: 'User deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { deleteUser };