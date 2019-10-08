const express = require("express");
const app = express();
const server = app.listen(1337);
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');

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

mongoose.connect('mongodb://localhost/mongofirst', {
useUnifiedTopology: true,
useNewUrlParser: true,
});

const QouteSchema = new mongoose.Schema({
    name: {type: String, required: true},
    qoute: {type: String, required: true}}, 
    {timestamps: true});

   const Qoute = mongoose.model('Qoute', QouteSchema);



app.get('/', (req, res) => {  
    Qoute.find()
        .then(data => res.render("index", {qoutes: data}))
        .catch(err => res.json(err));
});

app.get('/qoutes', (req, res) => {  
    Qoute.find()
        .then(data => res.render("qoutes", {qoutes: data}))
        .catch(err => res.json(err));
});


app.post('/qoutes', (req, res) => {
    const qoute = new Qoute(req.body);
    qoute.save()
        .then(data => {
            console.log('qoute created: ', data);
            res.redirect('/');
        })
        .catch(err => {
            console.log("We have an error!", err);
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        });
});


