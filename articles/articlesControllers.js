const express = require("express");
const router = express.Router();
const slugify = require('slugify');
const Article = require('./Article');
const Category = require('../categories/categorie');
const bodyParser = require("body-parser");
const adminAuth = require("../middlewares/adminAuth")


router.get("/admin/articles", adminAuth, (req, res) => {
    Article.findAll({ include: [{model: Category}] }).then((articles) => {
        
        return res.render("admin/articles/index", { articles: articles,  });
    });
});

router.get("/admin/articles/new", adminAuth, (req, res) => {
    Category.findAll().then((categories) => {
        return res.render("admin/articles/new", { categories: categories });
    })   
});

router.post("/article/save", adminAuth, (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.option_categories;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        return res.redirect("/admin/articles",);
    });
});

router.post("/articles/delete", adminAuth, (req, res) => {
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

router.get("/admin/articles/edit/:id", adminAuth, (req, res) => {
    let id = req.params.id;
    Article.findByPk(id).then((article) => {
        if(article != undefined)
        {
            Category.findAll().then((categories) => {
                res.render("admin/articles/edit", { article: article ,categories: categories });
            });
            
        }
        else
        {
            res.redirect("/")
        }
    }).catch( err => {
        res.redirect("/")
    })
});

router.post("/articles/update", adminAuth, (req, res) => {
    let id = req.body.id;
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.option_categories

    Article.update({
        title: title,
        body: body,
        categoryId: category,
        slug: slugify(title)
    }, {
        where: { id: id}
    }).then(() => {
        res.redirect("/admin/articles")
    }).catch(err => {
        res.redirect("/")
    })
});

router.get("/articles/pages/:num",(req, res)=>{
    let pages = req.params.num;
    let offset = 0;
    if(isNaN(pages || pages == 1)){
        offset = 0;
    } else {
        offset = (parseInt(pages) - 1) * 4;
    }
  

    Article.findAndCountAll({
        limit: 4, // Quantidade exibida por pagina.
        offset: offset, // Quais serão exibidas..
        order: [['id', 'DESC']]
    }).then(articles => {
        var next
        if (offset + 4 >= articles.count){
            next = false
        }else {
            next = true
        }
        let result = {
            page: parseInt(pages),
            next: next,
            articles:articles
        }

        Category.findAll().then(categories => {
            res.render("admin/articles/pages", { result: result, categories: categories})
        })

        //res.json(result)
    })  
})

module.exports = router;