const User = require("../../Models/User");

async function sendFriendRequest(req, res) {
    const { userId, friendId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(friendId)
        if (user.friends.includes(userId)) {
            res.status(400).json({ error: 'You are a friend already' });
        } else if (user.friendRequests.includes(userId)) {
            res.status(400).json({ error: 'You have already sent a friend request' });
        } else {
            await User.findByIdAndUpdate(friendId, { $push: { friendRequests: userId } });
            res.status(200).json({ message: 'Friend Request Sent' });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Error sending friend request' });
    }
}



async function updateFR(req, res) {
    const { userId, friendId, status } = req.params;
    try {
        if (status === '0') {
            // Decline the friend request
            await User.findByIdAndUpdate(userId, { $pull: { friendRequests: friendId } });
            res.status(200).json({ message: 'Friend Request Declined' });
        } else {
            // Accept the friend request
            await User.findByIdAndUpdate(userId, {
                $push: { friends: friendId },
                $pull: { friendRequests: friendId }
            });

            await User.findByIdAndUpdate(friendId, {
                $push: { friends: userId }
            });

            res.status(200).json({ message: 'Friend Request Accepted' });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Error updating friend request status' });
    }
}


async function getFriendRequests(req, res) {
    try {

        const { userId } = req.params;
        const friendRequests = await User.findById(userId).populate('friendRequests')
        console.log(friendRequests)
        res.json(friendRequests.friendRequests)
    } catch (error) {
        res.status(500).json({ error: 'Error getting friend requests' });
    }
}

module.exports = { sendFriendRequest, updateFR,getFriendRequests }