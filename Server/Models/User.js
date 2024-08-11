const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    parentId: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    profilePicture: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    preferences: {
        type: Map,
        of: String,
        default: {}
    },
    createdAt: {
        type: Date,
        default: Date.now
    }, friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', }],
    miniAppName: { type: String, enum: ['wellness', 'budgeting', 'mindfull', 'productivity', 'social'] }
}, { timestamps: true });


userSchema.index({ username: 1 });

// Pre hook to delete related data
userSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    const userId = this._id;
    await mongoose.model('Post').deleteMany({ author: userId });
    await mongoose.model('Comment').deleteMany({ author: userId });
    await mongoose.model('Forum').deleteMany({ creator: userId });
    await mongoose.model('Goal').updateMany({ sharedWith: userId }, { $pull: { sharedWith: userId } });
    await mongoose.model('Message').deleteMany({ $or: [{ sender: userId }, { receiver: userId }] });
    next();
});

module.exports = mongoose.model('User', userSchema);
