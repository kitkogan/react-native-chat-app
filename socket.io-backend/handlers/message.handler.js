let currentMessageId = 1;

//socket listens for the message
//gets the user id and called the createmessage function
//broadcats the message
function handleMessage(socket, users) {
    socket.on('message', messageText => {
        const user = users[socket.id];
        const message = createMessage(user, messageText);
        console.log(message);
        socket.broadcast.emit('message', message);
    });
}

//gets the user and messageText from the message handler
//returns the messager and user information
function createMessage(user, messageText) {
    return {
        _id: currentMessageId++, 
        text: messageText,
        createdAt: new Date(),
        user: {
            _id: user.userId,
            name: user.username,
            avatar: user.avatar
        }
    };
}

module.exports = {handleMessage}