const { deleteForum } = require('../Controllers/Forums/Delete');
const { editForum } = require('../Controllers/Forums/Edit');
const { getAllForums, getForum, getUserForums } = require('../Controllers/Forums/GetForums');
const initializeForum = require('../Controllers/Forums/InitalizeForum');

const ForumRouter = require('express').Router();

ForumRouter.get('/forum', getAllForums)
ForumRouter.get('/forum/:formId', getForum)
ForumRouter.get('/forum/:userId', getUserForums);
ForumRouter.post('/forum/initalize', initializeForum);
ForumRouter.put('/forum/:forumId', editForum)
ForumRouter.delete('/forum/:forumId', deleteForum)

module.exports = { ForumRouter };