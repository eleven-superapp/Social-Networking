const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        text: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 'Sent',
            enum: ['Sent', 'Delivered', 'Seen'],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: '15d', // Automatically delete documents after 15 days
        },
    },
    { timestamps: true }
);

messagesSchema.index({ sender: 1, receiver: 1, createdAt: -1 });

const Messages = mongoose.model("Messeging", messagesSchema);

module.exports = { Messages };
