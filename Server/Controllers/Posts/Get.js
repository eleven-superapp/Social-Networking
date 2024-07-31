const Post = require('../../Models/Post');
const Comment = require('../../Models/Comment');
const { populate } = require('../../Models/User');

async function getPost(req, res) {
    try {
        const postId = req.params.postId;
        const { commentsLimit = 10, repliesLimit = 5 } = req.query; // Query parameters for pagination
        const post = await Post.findById(postId)
            .populate({
                path: 'comments',
                select: 'author content replies',
                options: { limit: parseInt(commentsLimit, 10) },
                populate: {
                    path: 'author',
                    select: 'username'
                }, populate: {
                    path: 'replies',
                    select: 'content author replies',
                    populate: {
                        path: 'author',
                        select: 'username'
                    }, populate: {
                        path: 'replies',
                        select: 'content author',
                        populate: {
                            path: 'author',
                            select: 'username'
                        }
                    }
                }
            }).populate({
                path: 'upvotes downvotes',
                select: 'username'
            }).populate({
                path: 'forum',
                select: 'title'
            }).populate({
                path: 'author',
                select: 'username'
            })
            .lean();

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getPost };
