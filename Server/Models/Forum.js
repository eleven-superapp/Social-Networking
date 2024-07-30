const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, { timestamps: true });

forumSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    const forumId = this._id;
    await mongoose.model('Post').deleteMany({ forum: forumId });
    await mongoose.model('Comment').deleteMany({ forum: forumId });
    next();
})

module.exports = mongoose.model('Forum', forumSchema);
