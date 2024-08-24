const { makePost } = require('../Controllers/Posts/Create');
const { getPost, getUserPosts, getAllPosts } = require('../Controllers/Posts/Get');

const PostRouter = require('express').Router();

PostRouter.post('/post/', makePost);
PostRouter.get('/post/:postId', getPost);
PostRouter.get('/user/:userId/posts', getUserPosts);
PostRouter.get('/posts', getAllPosts);

module.exports = { PostRouter };