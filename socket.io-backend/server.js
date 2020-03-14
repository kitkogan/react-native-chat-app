const io = require('socket.io')();

//when server is connected, run this function
io.on('connection', function() {
    console.log('a user connected');
});

io.listen(3001);
