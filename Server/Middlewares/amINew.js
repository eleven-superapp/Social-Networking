const jwt = require('jsonwebtoken');
const User = require('../Models/User');
async function amINew(req, res, next) {
    const token = req.cookies?.jwt;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
        if (err) {
            console.log(process.env.JWT_SECRET)
            return res.status(403).json({ message: 'Unauthorized' });
        }
        try {
            const eleven = await User.findOne({ username: "Eleven Ai" })
            if (!eleven) {
                const elevenBot = new User({
                    username: "Eleven Ai"
                })
                elevenBot.save().then(async (eleven) => {
                    const createChild = new User({
                        username: `${data.user.username}`,
                        parentId: data.user._id,
                        miniAppName: 'social',
                        friends: [eleven._id]
                    });
                    await createChild.save()
                    next();
                })

            } else {
                const childUser = await User.findOne({ parentId: data.user._id });

                if (!childUser) {
                    const createChild = new User({
                        username: `${data.user.username}`,
                        parentId: data.user._id,
                        miniAppName: 'social',
                        friends: [eleven._id]
                    });
                    await createChild.save()
                }
                next();
            }
        } catch (error) {
            console.error('Error in amINew middleware:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
}

module.exports = amINew;
