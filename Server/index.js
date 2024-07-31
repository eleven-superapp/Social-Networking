const express = require('express');
const { HomeRouter } = require('./Router/Home');
const { UserRouter } = require('./Router/User');
const { ForumRouter } = require('./Router/Forum');
const { PostRouter } = require('./Router/Post');
const { ReactionRouter } = require('./Router/Reaction');
const { CommentRouter } = require('./Router/Comment');
require('dotenv').config();
const cors = require('cors');
require('./Utils/connection'); // Ensure this handles errors and reconnections

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*", // Use environment variable or default
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Routes
app.use('/api/social/v1/', HomeRouter);
app.use('/api/social/v1/', UserRouter);
app.use('/api/social/v1/', ForumRouter);
app.use('/api/social/v1/', PostRouter);
app.use('/api/social/v1/', ReactionRouter);
app.use('/api/social/v1/', CommentRouter);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = server;
require('./Controllers/Messeging/wss')
