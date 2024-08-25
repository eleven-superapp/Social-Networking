const Comment = require("../../Models/Comment");
const Post = require("../../Models/Post");

async function comment(req, res) {
    try {
        console.log("Creating comment called.");
        const { content, author, postId, forumId } = req.body;
        console.log("Request data:", { content, author, postId, forumId });
        
        if (!content || !author || !postId || !forumId) {
            console.log("Some fields are empty");
            return res.status(400).json({ message: "All fields are required" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            console.log("Post Id is wrong");
            return res.status(404).json({ message: "Post not found" });
        }

        console.log("Post found:", post);

        const comment = new Comment({
            author: author,
            content: content,
            post: postId,
            forum: forumId,
            upvotes: [],  // Initialize as empty array
            downvotes: [] // Initialize as empty array
        });

        const savedComment = await comment.save();
        console.log("Comment saved:", savedComment);

        post.comments.push(savedComment._id);
        await post.save();

        // Populate comments and author data before sending response
        const populatedPost = await Post.findById(postId)
        .populate([
            {
                path: 'comments',
                select: 'author content replies upvotes downvotes createdAt',
                populate: [
                    {
                        path: 'author',
                        select: 'username profilePicture' // Include profilePicture here
                    },
                    {
                        path: 'replies',
                        select: 'author content replies upvotes downvotes createdAt',
                        populate: [
                            {
                                path: 'author',
                                select: 'username profilePicture' // Include profilePicture here
                            },
                            {
                                path: 'replies',
                                select: 'author content replies upvotes downvotes createdAt',
                                populate: {
                                    path: 'author',
                                    select: 'username profilePicture' // Include profilePicture here
                                }
                            }
                        ]
                    }
                ]
            },
            {
                path: 'upvotes downvotes',
                select: 'username profilePicture' // Include profilePicture here
            },
            {
                path: 'forum',
                select: 'title'
            },
            {
                path: 'author',
                select: 'username profilePicture' // Include profilePicture here
            }
        ])

        console.log("Populated post data:", populatedPost);
        res.status(201).json({ post: populatedPost });

    } catch (e) {
        console.error("Caught exception:", e);
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