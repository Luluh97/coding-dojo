const express = require("express");
const app = express();
const server = app.listen(8000);
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

mongoose.connect('mongodb://localhost/mongoose_dashboard', {
useUnifiedTopology: true,
useNewUrlParser: true,
});


const DashboardSchema = new mongoose.Schema({
    animal: {type: String, required: true},
    animal: {type: String, required: true},
    family: {type: String, required: true}, 
    order: {type: String, required: true},
    class: {type: String, required: true}},
    {timestamps: true});

   const Dashboard = mongoose.model('Dashboard', DashboardSchema);


app.get('/', (req, res) => {  
    Dashboard.find()
        .then(data => res.render("all", {all: data}))
        .catch(err => res.json(err));
});

app.get('/mongoose/new', (req, res) => {  
    Dashboard.find()
        .then(data => res.render("new", {dash: data}))
        .catch(err => res.json(err));
});

app.post('/mongooses', (req, res) => {
    const dash = new Dashboard(req.body);
    dash.save()
        .then(data => {
            console.log('animal created: ', data);
            res.redirect('/mongoose/new');
        })
        .catch(err => {
            console.log("We have an error!", err);
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/mongoose/new');
        });
});

app.get('/mongooses/:id', (req, res) => {  
    Dashboard.findOne({_id : req.params.id})
        .then(data => {
                res.render("info", {info: data});
            })
        .catch(err => res.json(err));
});

app.get('/mongooses/edit/:id', (req, res) => {  
    Dashboard.findOne({_id : req.params.id})
        .then(data => {
                res.render("edit", {edit: data});
            })
        .catch(err => res.json(err));
});

app.post('/mongooses/:id', (req, res) => {
    Dashboard.update({_id : req.params.id}, {animal: req.body.animal,
    family: req.body.family, order: req.body.order, class: req.body.class
    })
        .then(data => {
            res.redirect('/');
        })
        .catch(err => {
            console.log("We have an error!", err);
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/mongoose/new');
        });
});

app.post('/mongooses/destroy/:id', (req, res) => {
    Dashboard.findOneAndRemove({_id : req.params.id})
        .then(data => {
            res.redirect('/');
        })
        .catch(err => {
            console.log("We have an error!", err);
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/mongoose/new');
        });
});

