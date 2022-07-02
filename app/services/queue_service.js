const Queue = require('bee-queue');
const { processEvent } = require('../services/slack_service');

const slackEventQueue = new Queue('slack-file-queue', {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
});

slackEventQueue.process(async (job, done) => {
    const event = job.data;
    const result = await processEvent(event);
    return done(result === true ? null : 'job failed', result);
});

slackEventQueue.on('ready', () => {
    console.log('queue now ready to start doing things');
});

slackEventQueue.on('error', (err) => {
    console.log(`A queue error happened: ${err.message}`);
});

slackEventQueue.on('retrying', (job, err) => {
    console.log(
        `Job ${job.id} failed with error ${err.message} but is being retried!`
    );
});

slackEventQueue.on('failed', (job, err) => {
    console.log(`Job ${job.id} failed with error ${err}`);
});

slackEventQueue.on('stalled', (jobId) => {
    console.log(`Job ${jobId} stalled and will be reprocessed`);
});

slackEventQueue.on('job succeeded', (jobId, result) => {
    console.log(`Job ${jobId} succeeded with result: ${result}`);
});

module.exports = { slackEventQueue }