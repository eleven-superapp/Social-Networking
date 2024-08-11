const { sendFriendRequest, updateFR, getFriendRequests } = require('../Controllers/Connectivity/FR');
const { getOlderChat } = require('../Controllers/Messeging/Chat');

const ConnectivityRouter = require('express').Router();

ConnectivityRouter.post('/send/FR/:userId/:friendId', sendFriendRequest)
ConnectivityRouter.put('/updateFriendRequest/:userId/:friendId/:status', updateFR)
ConnectivityRouter.get('/get-friend-request/:userId', getFriendRequests)
ConnectivityRouter.delete('/messages/:userId/:friendId', getOlderChat)
module.exports = { ConnectivityRouter };