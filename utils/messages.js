const moment = require('moment');

const time = moment();

function formatMessage(username, text) {
    return {
        username, 
        text,
        time: time.format('h:mm a')
    }
}

function systemMessageFormat(systemName, text, username) {
    return {
        systemName,
        text,
        username,
        time: time.format('h:mm a')
    }
}

module.exports = {formatMessage, systemMessageFormat};