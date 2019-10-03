const express = require("express");
const app = express();
app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({extended: true}));


var counter = 0; 

app.get('/', (req, res) => {
    counter++;
    res.render('index', {counter: counter});
});

app.post('/add_two', (req, res) => {
    counter=counter+2;
    res.render('index', {counter: counter});
});

app.post('/reset', (req, res) => {
    counter=1;
    res.render('index', {counter: counter});
});
