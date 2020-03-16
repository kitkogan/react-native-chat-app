const io = require("socket.io")();
const messageHandler = require("./handlers/message.handler");

//vars set
let currentUserId = 2;
const users = {};

//creates a random avatar for each new user
function createUserAvatarUrl() {
  const rand1 = Math.round(Math.random() * 200 + 100);
  const rand2 = Math.round(Math.random() * 200 + 100);
  return `https://placeimg.com/${rand1}/${rand2}/any`;
}

//establishes connection to socket
//creates an incremential id for each new user in the chat
//when a user joins the chat, a username and avatar are recorded/displayed
//message handler listens for user input
io.on("connection", socket => {
  console.log("a user connected!");
  console.log(socket.id);
  users[socket.id] = { userId: currentUserId++ };
  socket.on("join", username => {
    users[socket.id].username = username;
    users[socket.id].avatar = createUserAvatarUrl();
    messageHandler.handleMessage(socket, users);
  });
});

io.listen(3001);
