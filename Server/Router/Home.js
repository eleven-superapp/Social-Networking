const amINew = require('../Middlewares/amINew');

const HomeRouter = require('express').Router();

HomeRouter.get('/', amINew, async (req, res) => {
    res.send('Hello, World!')
})

module.exports = { HomeRouter };