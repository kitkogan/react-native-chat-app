let currentMessageId = 1;

function handleMessage(socket, users) {
    socket.on('message', messageText => {
        const user = users[socket.id];
        const message = createMessage(user, messageText);
        console.log(message);
        socket.broadcast.emit('message', message);
    });
}

function createMessage(user, messageText) {
    return {
        _id: currentMessageId++, 
        text: messageText,
        createdAt: new Date(),
        user: {
            _id: user.userId,
            name: user.username,
            avatar: "https://placeimg.com/140/140/any"
        }
    };
}

module.exports = {handleMessage}