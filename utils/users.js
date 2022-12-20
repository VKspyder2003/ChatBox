const users = []

//Joining the user
function userJoin(id, username, room) {
    const user = {id, username, room};
    users.push(user);
    return user;
}

//Getter method
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

//When someone leaves the chat
function userLeave(id) {
    const idx = users.findIndex(user => user.id === id);
    if(idx !== -1) {
        return users.splice(idx, 1)[0];
    }
}

//Extracting users form room
function getCurrentRoomUsers(room) {
    return users.filter(user=>user.room===room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getCurrentRoomUsers
}