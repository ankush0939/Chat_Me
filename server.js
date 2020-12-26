const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Run with Client connects
io.on('connection', socket => {
    
    // Welcome current user
    socket.emit('message', 'welcome to Chat_Me!');

    //Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Runs When client disconnects
    socket.on('disconnects', () => {
        io.emit('message', 'A user has left the chat!');
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});