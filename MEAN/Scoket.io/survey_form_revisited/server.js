const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
const server =  app.listen(4400)
const io = require('socket.io')(server);



io.on('connection', function(socket){
   
    socket.on('posting_form', function (data){
        var random_number = Math.floor(Math.random() * 1000) + 1;
        socket.emit('updated_message', 
        {msg: 'You have emitted the following information to the server:{name: '+data.name+', location: '+data.location+', language: '+data.language+', comment: '+data.comment+'}'+' Your lucky number emitted by the server is: '+random_number}
        );
    });
});

app.use(express.urlencoded({extended: true}));
app.get("/", (req, res) => {
    res.render('index');
})

