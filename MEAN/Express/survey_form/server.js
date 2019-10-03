const express = require("express");
const app = express();
app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({extended: true}));

const session = require('express-session');
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))



app.get('/', (req, res) => {
    if(!req.session.counter){

        req.session.counter = 1
    }
    else{
        req.session.counter++;
    }
   
    res.render('index', {counter: req.session.counter});
});

app.post('/add_two', (req, res) => {
    req.session.counter=req.session.counter+2;
    res.render('index', {counter: req.session.counter});
});

app.post('/reset', (req, res) => {
    req.session.counter=1;
    res.render('index', {counter: req.session.counter});
});
