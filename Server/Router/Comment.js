const { comment, reply } = require('../Controllers/Comments/Comment');

const CommentRouter = require('express').Router();

CommentRouter.post('/comment/', comment)
CommentRouter.put('/reply/', reply)

module.exports = { CommentRouter };