const Comment = require("../../Models/Comment");
const Post = require("../../Models/Post");

async function editPostDetails(req, res) {
    const { title, content, media, postId } = req.body;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.title = title;
    post.content = content;
    post.media = media.length == undefined ? [media] : [...media];
    post.save().then((updatedPost) => {
        res.status(200).json({ updatedPost });
    })
}


module.exports = { editPostDetails }