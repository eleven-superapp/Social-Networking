async function editForum(req, res) {
    try {
        const { formId } = req.params;
        const { title, description } = req.body;
        if (!formId) {
            return res.status(400).json({ message: "Forum ID is required" });
        } else {
            const updatedForum = await Forum.findByIdAndUpdate(title, description, { new: true });
            if (!updatedForum) {
                return res.status(404).json({ message: "Forum not found" });
            }
            res.status(200).json(updatedForum);
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = { editForum }