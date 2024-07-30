const User = require('../../Models/User');

async function deleteUser(req, res) {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.deleteOne();

        console.log('User and related data deleted successfully');
        res.status(200).json({ message: 'User and related data deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
}

module.exports = { deleteUser };
