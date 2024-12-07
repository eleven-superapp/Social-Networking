const { makePost } = require("../Controllers/Posts/Create");
const {
  getPost,
  getUserPosts,
  getAllPosts,
  getForumPosts,
} = require("../Controllers/Posts/Get");

const PostRouter = require("express").Router();

PostRouter.get("/post/:forumId/posts", getForumPosts);
PostRouter.post("/post", makePost);
PostRouter.get("/post/:postId", getPost);
PostRouter.get("/user/:userId/posts", getUserPosts);
PostRouter.get("/posts", getAllPosts);

module.exports = { PostRouter };
