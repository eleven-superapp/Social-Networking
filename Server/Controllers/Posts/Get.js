const Post = require('../../Models/Post');
const Comment = require('../../Models/Comment');

async function getPost(req, res) {
    try {
        const postId = req.params.postId;
        const { commentsLimit = 10, repliesLimit = 5 } = req.query; // Query parameters for pagination

       
        const post = await Post.findById(postId)
            .populate({
                path: 'comments',
                options: { limit: parseInt(commentsLimit, 10) },
                populate: {
                    path: 'author', 
                    select: 'username' 
                }
            })
            .lean();

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const populatedComments = await Promise.all(post.comments.map(async (comment) => {
            const populatedComment = await Comment.findById(comment._id)
                .populate({
                    path: 'replies',
                    options: { limit: parseInt(repliesLimit, 10) },
                    populate: {
                        path: 'author',
                        select: 'username' 
                    }
                })
                .lean();
            return populatedComment;
        }));

        post.comments = populatedComments;

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getPost };
