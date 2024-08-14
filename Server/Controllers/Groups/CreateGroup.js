const Group = require("../../Models/Groups");
const User  = require("../../Models/User");

const createGroup = async (req, res) => {
    console.log(req.body)
    try {
        const { groupName, groupDescription, members, admins, location, public } = req.body;
        if (!groupName || !groupDescription) {
            return res.status(400).json({ message: 'Group name and description are required.' });
        }
        const validAdmins = await User.find({ _id: { $in: admins } });
        const validMembers = await User.find({ _id: { $in: members } });
        const newGroup = new Group({
            groupName,
            groupDescription,
            members: validMembers.map(member => member._id),
            admins: validAdmins.map(admin => admin._id),
            location,
            public: public || false,
        });
        await newGroup.save().then((group)=>{
            console.log(group)
            return res.status(201).json(group);
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error while creating the group.' });
    }
};

module.exports = { createGroup };
