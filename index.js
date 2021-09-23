var express = require('express');
var socket = require('socket.io');
const port = process.env.PORT || 4000;

// App setup
var app = express();
var server = app.listen(port, function(){
    console.log('listening for requests on port',port);
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    socket.on('chat',(data) => {
        io.sockets.emit('chat',data);
    });

    socket.on('typing',(data) =>{
        socket.broadcast.emit('typing',data);
    });
});
