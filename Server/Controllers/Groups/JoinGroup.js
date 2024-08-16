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

const processJoinRequest = async (req, res) => {
    const { groupId, userId, status, doer } = req.body;

    try {
        const group = await Group.findById(groupId);
        const isAdmin = group.admins.includes(doer);
        if (!isAdmin) {
            return res.status(403).json({ message: "Only admins can process join requests" });
        }
        const joinRequest = group.joinRequests.find(
            (request) => request.userId.toString() === userId
        );
        if (!joinRequest) {
            return res.status(404).json({ message: "Join request not found" });
        }
        if (status === "accept") {
            const isMember = group.members.includes(userId);
            if (!isMember) {
                group.members.push(userId);
            }
        }
        group.joinRequests = group.joinRequests.filter(
            (request) => request.userId.toString() !== userId
        );
        await group.save();
        res.status(200).json({ message: `Join request ${status}ed successfully` });
    } catch (error) {
        console.error(`Error processing join request: ${error}`);
        res.status(500).json({ message: "Failed to process join request" });
    }
};

module.exports = { sendJoinRequest, processJoinRequest };
