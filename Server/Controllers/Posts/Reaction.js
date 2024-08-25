const Post = require("../../Models/Post");

async function react(req, res) {
    try {
        console.log("Reaction: ", req.body);
        console.log("Adding reaction to post: ", req.body.reaction);
        const { reaction, postId, reacterId } = req.body;
        if (!reaction || !postId || !reacterId) {
            return res.status(400).json({ message: 'Bad Request. All credentials must be provided i.e., {reaction: "up" || "down", postId, and reacterId}' });
        }
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post Not Found' });
        }
        const upvoteIndex = post.upvotes.indexOf(reacterId);
        const downvoteIndex = post.downvotes.indexOf(reacterId);
        if (upvoteIndex !== -1) {
            post.upvotes.splice(upvoteIndex, 1);
        }
        if (downvoteIndex !== -1) {
            post.downvotes.splice(downvoteIndex, 1);
        }
        if (reaction.toLowerCase() === "up") {
            post.upvotes.push(reacterId);
        } else if (reaction.toLowerCase() === "down") {
            post.downvotes.push(reacterId);
        } else if (reaction.toLowerCase() === "neutral") {
            post.upvotes.pop(reacterId);
            post.downvotes.pop(reacterId);
        } else {
            return res.status(400).json({ message: 'Invalid reaction type' });
        }
        await post.save();
        res.status(200).json({ message: 'Reaction recorded successfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
}
module.exports = { react };
