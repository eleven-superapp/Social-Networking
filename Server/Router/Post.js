const { makePost } = require('../Controllers/Posts/Create');
const { getPost } = require('../Controllers/Posts/Get');

const PostRouter = require('express').Router();

PostRouter.post('/post/', makePost)
PostRouter.get('/post/:postId', getPost)

module.exports = { PostRouter };