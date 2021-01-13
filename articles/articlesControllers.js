const express = require("express");
const router = express.Router();
const slugify = require('slugify');
const Article = require('./Article');
const Category = require('../categories/categorie');


router.get("/admin/articles", (req, res) => {
    Article.findAll({ include: [{model: Category}] }).then((articles) => {
        
        return res.render("admin/articles/index", { articles: articles });
    });
});

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then((categories) => {
        return res.render("admin/articles/new", { categories: categories });
    })   
});

router.post("/article/save", (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.option_categories;

    console.log(category)

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        return res.redirect("/admin/articles",);
    });
});

router.post("/articles/delete", (req, res) => {
    let id = req.body.id;

    if(id != undefined)
    {
        Article.destroy({
            where: { id: id}
        }).then(() => {
            res.redirect("/admin/articles");
        })
    }    
    else
    {
        res.redirect("/admin/articles");
    }

});

module.exports = router;