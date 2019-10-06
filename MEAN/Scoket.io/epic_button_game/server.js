const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
const server =  app.listen(4400)
const io = require('socket.io')(server);



io.on('connection', function(socket){
    var counter = 0
    socket.on('posting_form', function (data){
        counter = counter + 1;
        io.emit('counter', {counter: counter})  
    });
    var reset = 0
    socket.on('reset_form', function (data){
        io.emit('counter', {counter: reset})  
    });
});

app.use(express.urlencoded({extended: true}));
app.get("/", (req, res) => {
    res.render('index');
})

