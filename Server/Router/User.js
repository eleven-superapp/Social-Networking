const { createUser } = require('../Controllers/User/CreateUser');
const { deleteUser } = require('../Controllers/User/DeleteUser');
const { editUser } = require('../Controllers/User/EditUser');
const { getUser } = require('../Controllers/User/GetUser');

const UserRouter = require('express').Router();

UserRouter.get('/user/', getUser)
UserRouter.post('/user/create', createUser)
UserRouter.put('/user/edit/:userId', editUser)
UserRouter.delete('/user/:userId', deleteUser)

module.exports = { UserRouter };