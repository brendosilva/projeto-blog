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
app.use(bodyParser.urlencoded({ extended: false }));
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

    Article.findAll({ order: [['id', 'DESC']] }).then((articles) => {

        Category.findAll().then(categories => {
            res.render("index", { article: articles, categories: categories })
        });

    });

});

app.get("/:slug", (req, res) => {
    let slug = req.params.slug;

    Article.findOne({
        where: { slug: slug }
    }).then((article) => {
        if (article != undefined) {

            Category.findAll().then(categories => {
                res.render("article", { article: article, categories: categories });
            });

        }
        else {
            res.redirect("/")
        }
    }).catch((err) => {
        res.redirect("/")
    })
});

app.get("/category/:slug", (req, res) => {
    let slug = req.params.slug;

    Category.findOne({
        where: { slug: slug },
        include: [{ model: Article }]
    }).then((category)=> {
        if(category != undefined)
        {
            Category.findAll().then(categories=>{
                res.render("index", { article: category.articles, categories: categories })
            })
        }
        else
        {
            res.redirect("/")
        }
    }).catch( err => {
        res.redirect("/")
    });
});

app.listen(door, () => {
    console.log('tudo ok');
});