const crypto = require('crypto')

const slackRequestVerification = function (req, res, next) {
    const version = 'v0';
    const key = process.env.SLACK_SIGNING_SECRET;
    const slackSignature = req.header('X-Slack-Signature');
    const slackRequestTimestamp = req.header('X-Slack-Request-Timestamp');
    const data = `${version}:${slackRequestTimestamp}:${JSON.stringify(req.body)}`;
    const hexdigest = `${version}=${crypto.createHmac('sha256', key).update(data).digest('hex')}`;

    if (slackSignature && hexdigest && crypto.timingSafeEqual(Buffer.from(slackSignature, 'utf8'), Buffer.from(hexdigest, 'utf8'))) {
        next();
    }else{
        return res.status(403).send('you are not authorized to access this route');
    }
}

module.exports = slackRequestVerification;