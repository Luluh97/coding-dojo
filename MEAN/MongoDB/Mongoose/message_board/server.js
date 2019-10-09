const express = require("express");
const app = express();
const server = app.listen(8000);
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
var Schema = mongoose.Schema
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use(express.urlencoded({extended: true}));
app.use(flash());
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

mongoose.connect('mongodb://localhost/message_board', {
useUnifiedTopology: true,
useNewUrlParser: true,
});
mongoose.Promise = global.Promise; //check

const BoardSchema = new mongoose.Schema({
    name: {type: String},
    message: {type: String},
    _comment: [{type: Schema.Types.ObjectId, ref: 'Comment' }]
    }, 
    {timestamps: true});

   const Board = mongoose.model('Board', BoardSchema);

const CommentSchema = new mongoose.Schema({
    com_name: {type: String},
    comment: {type: String},
    _board: {type: Schema.Types.ObjectId, ref: 'Board' }
    }, 
    {timestamps: true});

   const Comment = mongoose.model('Comment', CommentSchema);



app.get('/', (req, res) => {  
    Board.find().populate("_comment").exec(function (errors, dbMessage) {
        if (errors) {
            console.log("We have an error!");
            res.render("index");
        }
        res.render("index", { messageKey: dbMessage });
    
    });
});

app.post("/messages", function (req, res) {
    var msg = new Board({
        name: req.body.name,
        message: req.body.message
    });
    msg.save(function (errorsNewMessage) {
        if (errorsNewMessage) {
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    });
});

app.post("/comments/:id", function (req, res) {
    Board.findOne({_id: req.params.id}, function(error1, board){
        var comment = new Comment({
            com_name: req.body.com_name,
            comment: req.body.comment,
            _board: board._id
        });
        comment.save(function (errorsComment1) {
            board._comment.push(comment);
            board.save(function(error2){
                if (errorsComment1) {
                    res.redirect("/");
                } else {
                    res.redirect("/");
                }
            });
        });
    });
});

