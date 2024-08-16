const Group = require("../../Models/Groups");

const getGroupById = async (req, res) => {
    try {
        const { id } = req.params;
        const group = await Group.findById(id).populate('members admins joinRequests.userId')
        console.log(group.members)
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        console.log(group)
        return res.status(200).json(group);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error while fetching the group' });
    }
};

const getGroupChat = async (req, res) => {
    try {
        const { groupId, userId } = req.params;
        const group = await Group.findById(groupId)
        const isUserAMember = group.members.includes(userId);
        if (isUserAMember) {
            const groupChat = await Group.findById(groupId,{messeges:1}).populate({
                path: 'messeges', select: 'sender text', populate: {
                    path: 'sender',
                    select: 'username'
                }
            })
            return res.status(200).json(groupChat);
        } else {
            return res.status(400).json({ message: 'User is not a member of this group' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error while fetching the group chat' });
    }
}

const getGroupsByName = async (req, res) => {
    try {
        const { name } = req.params;
        const groups = await Group.find({ groupName: new RegExp(name, 'i') }).populate('members admins messeges');
        return res.status(200).json(groups);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error while fetching groups by name' });
    }
};


const getGroupsByMember = async (req, res) => {
    console.log(req.params)
    try {
        const { memberId } = req.params;
        const groups = await Group.find({ members: memberId }).populate('members admins messeges');
        return res.status(200).json(groups);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error while fetching groups by member' });
    }
};


const getGroupsByAdmin = async (req, res) => {
    try {
        const { adminId } = req.params;
        const groups = await Group.find({ admins: adminId }).populate('members admins messeges');
        return res.status(200).json(groups);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error while fetching groups by admin' });
    }
};

const getGroupsByLocation = async (req, res) => {
    try {
        const { location } = req.params;
        const groups = await Group.find({ location: new RegExp(location, 'i') }).populate('members admins messeges');
        return res.status(200).json(groups);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error while fetching groups by location' });
    }
};

const getGroupsByVisibility = async (req, res) => {
    try {
        const { public } = req.params;
        const groups = await Group.find({ public: public === 'true' }).populate('members');
        console.log(groups)
        return res.status(200).json(groups);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error while fetching groups by visibility' });
    }
};

const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find().populate('members admins messeges');
        return res.status(200).json(groups);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error while fetching all groups' });
    }
};


module.exports = { getAllGroups, getGroupById, getGroupsByAdmin, getGroupsByLocation, getGroupsByMember, getGroupsByVisibility, getGroupsByName, getGroupChat }