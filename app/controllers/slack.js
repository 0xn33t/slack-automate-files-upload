const asyncHandler = require('../middlewares/async');
const { slackEventQueue } = require('../services/queue_service');

// @desc        Triggered on slack events
// @route       POST /api/v1/slack/event
// @access      Public
exports.slackEventHandler = asyncHandler(async (req, res, next) => {
    const body = req.body;
    const event = body.event;

    slackEventQueue.createJob(event).save();

    res.setHeader('X-Slack-No-Retry', 1);
    res.status(200).json({ok: true});
});
