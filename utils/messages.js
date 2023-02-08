const moment = require('moment');

function formatMessage(username, text) {
    return {
        username, 
        text,
        time: moment().utcOffset('+05:30').format('h:mm a')
    }
}

function systemMessageFormat(systemName, text, username) {
    return {
        systemName,
        text,
        username,
        time: moment().utcOffset('+05:30').format('h:mm a')
    }
}

module.exports = {formatMessage, systemMessageFormat};
