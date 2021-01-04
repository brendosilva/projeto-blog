const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/connection');

//Routes
const categorieController = require("./categories/categoriesControllers");
const articlesController = require("./articles/articlesControllers");

//Models
const Article = require('./articles/Article');
const Category = require('./categories/categorie');

const app = express();
const door = 3000;

//view engine
app.set('view engine', 'ejs');

//static
app.use(express.static('public'));

//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Database
connection
    .authenticate()
    .then(() => {
        console.log('connection sucess');
    }).catch((error) => {
        console.log(error);
    });
    
app.use("/", categorieController);
app.use("/", articlesController);

app.get("/", (req, res) => {
    res.render('index')
});

app.listen(door, ()=> {
    console.log('tudo ok');
});