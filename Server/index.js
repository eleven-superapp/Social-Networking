const express = require('express');
const cookies = require('cookie-parser')
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken')
require('./Utils/connection'); // Ensure this handles errors and reconnections

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookies())
// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
const { HomeRouter } = require('./Router/Home');
const { UserRouter } = require('./Router/User');
const { ForumRouter } = require('./Router/Forum');
const { PostRouter } = require('./Router/Post');
const { ReactionRouter } = require('./Router/Reaction');
const { CommentRouter } = require('./Router/Comment')
const { ConnectivityRouter } = require('./Router/Connectivity');
const amINew = require('./Middlewares/amINew');
const User = require('./Models/User');

// Routes
app.use('/api/social/v1/', HomeRouter);
app.use('/api/social/v1/', UserRouter);
app.use('/api/social/v1/', ForumRouter);
app.use('/api/social/v1/', PostRouter);
app.use('/api/social/v1/', ReactionRouter);
app.use('/api/social/v1/', CommentRouter);
app.use('/api/social/v1/', ConnectivityRouter)

//Get social user
app.get('/api/social/v1/:parentId', amINew, async (req, res) => {
    try {
        const { parentId } = req.params;
        const user = await User.findOne({ parentId: parentId })
        if (!user) return res.status(404).json({ message: 'User not found' })
        jwt.sign({ user }, process.env.JWT_SECRET, (err, token) => {
            if (err) {
                console.log(err)
                res.status(500).json({ message: err.message })
            } else {
                res.status(200).cookie('socialToken', token, { httpOnly: true, maxAge: 3600000 }).json(user)
            }

        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
})
module.exports = app

require('./Socket/webSocket')