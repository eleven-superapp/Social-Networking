const { react } = require('../Controllers/Posts/Reaction');

const ReactionRouter = require('express').Router();

ReactionRouter.put('/reactions/react', react)

module.exports = { ReactionRouter };