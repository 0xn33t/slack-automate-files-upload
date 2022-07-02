const express = require('express');
const { slackEventHandler } = require('../controllers/slack');
const { slackRequestVerification, slackUrlVerification } = require('../middlewares');

const router = express.Router();

router.route('/event').post([slackUrlVerification, slackRequestVerification], slackEventHandler);

module.exports = router;