const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    }
}, { timestamps: true });

// Pre hook to delete related data
userSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    const userId = this._id;
    await mongoose.model('Post').deleteMany({ author: userId });
    await mongoose.model('Comment').deleteMany({ author: userId });
    await mongoose.model('Forum').deleteMany({ creator: userId });
    await mongoose.model('Goal').updateMany({ sharedWith: userId }, { $pull: { sharedWith: userId } });
    next();
});

module.exports = mongoose.model('User', userSchema);
