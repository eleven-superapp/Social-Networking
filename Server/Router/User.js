const { createUser } = require('../Controllers/User/CreateUser');
const { editUser } = require('../Controllers/User/EditUser');
const { getUser } = require('../Controllers/User/GetUser');

const UserRouter = require('express').Router();

UserRouter.post('/user/create', createUser)
UserRouter.put('/user/edit/:userId', editUser)
UserRouter.get('/user/', getUser)

module.exports = { UserRouter };