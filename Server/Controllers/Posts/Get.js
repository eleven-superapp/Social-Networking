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

async function getUserPosts(req, res) {
    try {
        const userId = req.params.userId;
        const { postsLimit = 10, commentsLimit = 10, repliesLimit = 5 } = req.query; // Query parameters for pagination
        
        // Find posts by user ID
        const posts = await Post.find({ author: userId })
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
            .limit(parseInt(postsLimit, 10)) // Limiting the number of posts returned
            .lean();

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: 'No posts found for this user' });
        }

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

async function getAllPosts(req, res) {
    try {
        console.log("Finding posts for home screen");
        const { postsLimit = 10, commentsLimit = 10, repliesLimit = 5, page = 1 } = req.query; // Query parameters for pagination and limits

        // Calculate the number of posts to skip for pagination
        const skip = (page - 1) * parseInt(postsLimit, 10);

        // Find all posts with pagination
        const posts = await Post.find()
            .populate({
                path: 'comments',
                select: 'author content replies',
                options: { limit: parseInt(commentsLimit, 10) },
                populate: {
                    path: 'author',
                    select: 'username profilePicture'
                }, populate: {
                    path: 'replies',
                    select: 'content author replies',
                    options: { limit: parseInt(repliesLimit, 10) },
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
            .limit(parseInt(postsLimit, 10)) // Limiting the number of posts returned
            .skip(skip) // Skipping posts for pagination
            .lean();

        if (!posts || posts.length === 0) {
            console.log("No posts found");
            return res.status(404).json({ message: 'No posts found' });
        }

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getPost, getUserPosts,  getAllPosts };
