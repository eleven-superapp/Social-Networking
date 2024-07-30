const Forum = require("../../Models/Forum");

async function initializeForum(req, res) {
    try {
        const { title, description, creator } = req.body;
        if (!title || !description || !creator) {
            return res.status(400).send("All fields are required");
        } else {
            const newForum = new Forum({
                title,
                description,
                creator
            })
            newForum.save().then((forum) => {
                res.status(201).json({ message: "New Forum has been initalized!", Forum: forum })
            })
        }
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = initializeForum;