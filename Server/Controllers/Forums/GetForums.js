const Forum = require("../../Models/Forum");

async function getAllForums(req, res) {
    try {
        const forums = await Forum.find({}).sort({ createdAt: -1 })
        res.status(200).json(forums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function getForum(req, res) {
    try {
        const { formId } = req.params;
        if (!formId) {
            return res.status(400).json({ message: "Forum ID is required" });
        } else {
            const forum = await Forum.findById(formId);
            if (!forum) {
                return res.status(404).json({ message: "Forum not found" });
            }
            res.status(200).json(forum);
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

async function getUserForums(req, res) {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        } else {
            const userForums = await Forum.find({ creator: userId });
            if (!userForums) {
                return res.status(404).json({ message: "No forums found for this user" });
            }
            res.status(200).json(userForums);
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}


module.exports = {
    getAllForums,
    getForum,
    getUserForums
};