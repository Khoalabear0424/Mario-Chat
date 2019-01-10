var express = require('express');
var socket = require('socket.io');

//App Setup
var app = express(); //invokes the express function
var server = app.listen(4000, function(){
    console.log('listening to request on port 4000');
}); //listens to a specific port number
// this wont display anything on its own if there is no file to "serve" to the browser

//Static files
app.use(express.static('public')); //serves up the files inside of the 'public' folder onto the browser

//Socket Setup
var io = socket(server); //takes in an input of server so it knows which port to open the connection

io.on('connection',function(socket){ //waits for successful connection.  when that connection is made, there is a callback function
    console.log('made socket connection',socket.id)

    socket.on('chat', function(data){ //look at line 16 of chat.js
        io.sockets.emit('chat',data)
        // io.sockets connects to all sockets connected to the port
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data)
    });

});