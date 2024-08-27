const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    forum: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forum',
        required: true
    },
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    downvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    media: [{
        type: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null  // Default to null for top-level comments
    },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
