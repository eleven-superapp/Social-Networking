const mongoose = require('mongoose')


const groupsSchema = new mongoose.Schema({
    groupName: { type: "string", required: true },
    groupDescription: { type: "string", required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messeges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Messeging" }],
    location: String,
    public: { type: Boolean },
    joinRequests: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            message: String,
        },
    ],

    founder: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, {
    timestamps: true
})

const Group = mongoose.model("Group", groupsSchema)

module.exports = Group;