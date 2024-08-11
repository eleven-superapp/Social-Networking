const { sendFriendRequest, updateFR, getFriendRequests, getUsers } = require('../Controllers/Connectivity/FR');
const getFriends = require('../Controllers/Connectivity/GetFriends');
const { getOlderChat } = require('../Controllers/Messeging/Chat');
const amINew = require('../Middlewares/amINew');

const ConnectivityRouter = require('express').Router();

ConnectivityRouter.post('/send/FR/:userId/:friendId', sendFriendRequest)
ConnectivityRouter.put('/updateFriendRequest/:userId/:friendId/:status', updateFR)
ConnectivityRouter.get('/get-friend-request/:userId', getFriendRequests)
ConnectivityRouter.get('/messages/:userId/:friendId', getOlderChat)
ConnectivityRouter.get('/find/:myUsername', getUsers)
ConnectivityRouter.get('/friends/:userId', getFriends)
module.exports = { ConnectivityRouter };