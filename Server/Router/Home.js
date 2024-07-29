const HomeRouter = require('express').Router();

HomeRouter.get('/', async function (req, res) {
    console.log('GET /')
    res.send('Hello, World!');
})

module.exports = { HomeRouter };