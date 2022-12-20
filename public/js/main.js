const form = document.getElementById('chat-form');
const messageInput = document.getElementById('msg');
const chats = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

// Joining room
socket.emit('joinRoom', { username, room });

//Welcome message
socket.on('welcomeMessage', message => {
    outputWelcomeMessage(message);

    chats.scrollTop = chats.scrollHeight;
});

//Displaying room and users
socket.on('displayRoomUsers', ({ room, users }) => {
    outputRoom(room);
    outputUsers(users);
});

//User leave and join Updates
socket.on('updateMessage', message => {
    outputUpdateMessage(message);

    chats.scrollTop = chats.scrollHeight;
});

//All the other messages
socket.on('message', message => {
    // console.log(message);
    outputMessage(message);

    chats.scrollTop = chats.scrollHeight;
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = messageInput.value;
    socket.emit('send', msg);
    messageInput.value = '';
    messageInput.focus();
});

//Handling empty message glitch
messageInput.addEventListener('input', e => {
    let msg = messageInput.value;
    if (!msg.trim()) {
        messageInput.setCustomValidity("Can't Send Empty String !!");
        messageInput.reportValidity();
    }
    else {
        messageInput.setCustomValidity("");
    }
});

function outputWelcomeMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.systemName} &#9900; <span>${message.time}</span></p>
    <p class="text">
        ${message.text} <strong>${message.username}</strong>
    </p>`;
    chats.appendChild(div);
}

function outputUpdateMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.systemName} &#9900; <span>${message.time}</span></p>
    <p class="text">
        <strong>${message.username}</strong> ${message.text}
    </p>`;
    chats.appendChild(div);
}

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} &#9900; <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    chats.appendChild(div);
}

function outputRoom(room) {
    roomName.innerText = room;
}

function outputUsers(users) {
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}