const Group = require("../../Models/Groups");

const sendJoinRequest = async (req, res) => {
    const { groupId, userId, message } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        const isMember = group.members.includes(userId);
        if (isMember) {
            return res.status(400).json({ message: "You are already a member of this group" });
        }
        const hasPendingRequest = group.joinRequests.some(request => request.userId.toString() === userId);
        if (hasPendingRequest) {
            return res.status(400).json({ message: "You have already sent a join request" });
        }
        group.joinRequests.push({ userId, message });
        await group.save();
        res.status(200).json({ message: "Request sent successfully" });
    } catch (error) {
        console.error("Error sending join request:", error);
        res.status(500).json({ message: "Failed to send join request" });
    }
};

module.exports = { sendJoinRequest };
