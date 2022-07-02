const slackUrlVerification = function (req, res, next) {
    const body = req.body;
    if (body.type && body.type === 'url_verification' && body.challenge) {
        return res.status(200).json({
            challenge: body.challenge,
        });
    }else{
        next();
    }
}

module.exports = slackUrlVerification;