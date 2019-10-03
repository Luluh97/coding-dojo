const express = require("express");
const app = express();

app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get('/cats', (request, response) => {
     response.render("cats");
  });

app.get("/cuddles", (req, res) => {
    var cat_info = [
        {name: "Cuddles", food: "Spaghetti", age: "1", sleeping:"sunbeam"}, 
    ];
    res.render('info', {cat: cat_info});
})

app.get("/lio", (req, res) => {
    var cat_info = [
        {name: "Lio", food: "Pasta", age: "2", sleeping:"bed"},  
    ];
    res.render('info', {cat: cat_info});
})

app.get("/fluffy", (req, res) => {
    var cat_info = [
        {name: "Fluffy", food: "Pizza", age: "3", sleeping:"sofa"},  
    ];
    res.render('info', {cat: cat_info});
})


