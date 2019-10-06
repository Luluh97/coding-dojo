var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)

users = []
connections = []

server.listen(process.env.PORT || 3000);
console.log('Listening on port 3000')
app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
    connections.push(socket);
  

    //Disconnect
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1)
    
    });

    //Send Message
    socket.on('send_message', function(data){
        console.log(data)
        io.sockets.emit('new_message', {msg: data, user:socket.username})    
    });

    //New User
    socket.on('new_user', function(data, callback){
        callback(true)
        socket.username = data;
        users.push(socket.username);
    });

   });
