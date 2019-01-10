//Make Connection
var socket = io.connect('http://localhost:4000'); //we can grab the io var becasue it was loaded before this file in the index.html file

//now that there is a connection, we can start sending data between server and client

//QUery DOM
var message = document.querySelector('#message');
    handle = document.querySelector('#handle');
    btn = document.querySelector('#send');
    output = document.querySelector('#output');
    feedback = document.querySelector('#feedback');
    //storing all these elements so we can interact with them


    
//Emit Events
btn.addEventListener('click',function(){
    socket.emit('chat',{
        message: message.value,
        handle: handle.value
        //even though this will send the data, there has to be something on the server side to "hande" the data being sent
    });
});

message.addEventListener("keypress", function(){
    socket.emit('typing',handle.value);
});

//Listen for events (from server)
socket.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ':<strong>' + data.message + "</p>";
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' +  data + 'is typing a message...</e></p>' ;
});