const { Messages } = require("../../Models/Messeging");

async function getOlderChat(req, res) {
    try {
        const { userId, friendId } = req.params;
        const messages = await Messages.find({
            $or: [{
                sender: friendId,
                receiver: userId
            }, {
                sender: userId,
                receiver: friendId
            }]
        }).sort({ createdAt: 1 })
        console.log(messages)
        console.log("messages")
        res.status(200).json(messages)

    } catch (e) {
        console.error(e)
        res.status(500).json({ error: e.message });
    }
}

module.exports = { getOlderChat }