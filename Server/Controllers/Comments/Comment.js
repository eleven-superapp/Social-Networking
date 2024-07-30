const Comment = require("../../Models/Comment");
const Post = require("../../Models/Post");

async function comment(req, res) {
    try {
        const { content, author, postId, forumId } = req.body;
        if (!content || !author || !postId || !forumId) {
            return res.status(400).json({ message: "All fields are required" });
        } else {
            const post = await Post.findById(postId);
            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            } else {
                const comment = new Comment({
                    author: author,
                    content: content,
                    post: postId,
                    forum: forumId
                })
                await comment.save().then(async (comment) => {
                    post.comments.push(comment._id);
                    await post.save().then((post) => {
                        res.status(201).json({ post });
                    })
                })
            }
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

async function reply(req, res) {
    try {
        const { content, author, postId, forumId, parentCommentId } = req.body;
        if (!content || !author || !postId || !forumId || !parentCommentId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const parentComment = await Comment.findById(parentCommentId);
        if (!parentComment) {
            return res.status(404).json({ message: "Parent comment not found" });
        }

        const newReply = new Comment({
            author: author,
            content: content,
            post: postId,
            forum: forumId
        });

        await newReply.save().then(async (reply) => {
            parentComment.replies.push(reply._id);
            await parentComment.save();
            res.status(201).json({ reply });
        });

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
module.exports = { comment, reply }