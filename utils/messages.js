const moment = require('moment');

var time = moment().utcOffset('+00:00').format('h:mm a');

function formatMessage(username, text) {
    return {
        username, 
        text,
        time
    }
}

function systemMessageFormat(systemName, text, username) {
    return {
        systemName,
        text,
        username,
        time
    }
}

module.exports = {formatMessage, systemMessageFormat};
