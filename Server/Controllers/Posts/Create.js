const Forum = require("../../Models/Forum");
const Post = require("../../Models/Post");

async function makePost(req, res) {
    try {
        const { title, content, author, forumId, media } = req.body;
        if (!title || !content || !author || !forumId) {
            return res.status(400).json({ message: 'Missing required fields' });
        } else {
            const forum = await Forum.findById(forumId)
            if (!forum) {
                return res.status(404).json({ message: 'Forum not found' });
            } else {
                const newPost = new Post({ title: title, content: content, author: author, forum: forumId, media: media.length == undefined ? [media] : [...media] })
                await newPost.save().then(async (post) => {
                    await Forum.findByIdAndUpdate(forumId, { $push: { posts: post._id } })
                    return res.status(201).json({ post });
                })
            }
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = { makePost }