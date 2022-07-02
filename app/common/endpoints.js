const { SLACK_API } = require('./constants');

const SLACK_FILES_INFO = (id) => `${SLACK_API}/files.info?file=${id}`;

module.exports = { SLACK_FILES_INFO }