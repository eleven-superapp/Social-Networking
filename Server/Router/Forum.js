const { getAllForums, getForum, getUserForums } = require('../Controllers/Forums/GetForums');
const initializeForum = require('../Controllers/Forums/InitalizeForum');

const ForumRouter = require('express').Router();

ForumRouter.get('/forum', getAllForums)
ForumRouter.get('/forum/:formId', getForum)
ForumRouter.get('/forum/:userId', getUserForums);
ForumRouter.post('/forum/initalize', initializeForum);

module.exports = { ForumRouter };