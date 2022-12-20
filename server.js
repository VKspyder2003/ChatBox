const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const {formatMessage, systemMessageFormat} = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getCurrentRoomUsers } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const systemName = 'System';

//Setting up our static folder for landing page
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        //Welcome message
        socket.emit('welcomeMessage', systemMessageFormat(systemName, 'Welcome to chat', username));

        //When someone joins
        socket.broadcast.to(user.room).emit('updateMessage', systemMessageFormat(systemName, `joined the chat`, username));

        //Total users in room
        io.to(user.room).emit('displayRoomUsers', {
            room: user.room,
            users: getCurrentRoomUsers(user.room)
        });
    });

    //Sending the message/text
    socket.on('send', msg => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    //When someone gets disconnected
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit('updateMessage', systemMessageFormat(systemName, `left the chat`, user.username));

            io.to(user.room).emit('displayRoomUsers', {
                room: user.room,
                users: getCurrentRoomUsers(user.room)
            });
        }
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => { console.log(`Server running on port ${PORT}`) });

