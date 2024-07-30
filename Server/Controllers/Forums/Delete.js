const Forum = require("../../Models/Forum");

async function deleteForum(req, res) {
    try {
        const forum = await Forum.findByIdAndDelete(req.params.id);
        if (!forum) {
            return res.status(404).json({ message: "Forum not found" });
        }
        res.status(204).json({ message: "Forum and its posts are deleted" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}