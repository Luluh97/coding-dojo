const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
const server =  app.listen(4400)
const io = require('socket.io')(server);



io.on('connection', function(socket){
    socket.on('green_clicked', function (data){
        
        io.emit('green_background')  
    });
    socket.on('blue_clicked', function (data){
        
        io.emit('blue_background')  
    });
    socket.on('pink_clicked', function (data){
        
        io.emit('pink_background')  
    });
});

app.use(express.urlencoded({extended: true}));
app.get("/", (req, res) => {
    res.render('index');
})

