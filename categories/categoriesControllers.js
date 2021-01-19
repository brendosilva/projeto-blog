const express = require("express");
const slugify = require("slugify"); // deixa a string em um modelo url
//const Category = require("./categorie");
const adminAuth = require("../middlewares/adminAuth")
const router = express.Router();
const Categorie = require('./categorie');


router.get("/admin/categories/new", adminAuth, (req, res) => {
    res.render("admin/categories/new");
});

router.get("/admin/categories", adminAuth, (req, res) => {
    Categorie.findAll().then((categories) => {
        res.render("admin/categories/index", { categories: categories });
    })
    
})

router.post("/categories/save", adminAuth, (req, res) => {
    let title = req.body.title_categorie;
    if(title != undefined)
    {
        Categorie.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories");
        });
    }
    else
    {
        res.redirect("/admin/categories/new");
    }
})

router.post("/categories/delete", adminAuth, (req, res) => {
    let id = req.body.id;

    if(id != undefined)
    {
        Categorie.destroy({
            where: { id: id}
        }).then(() => {
            res.redirect("/admin/categories");
        })
    }    
    else
    {
        res.redirect("/admin/categories");
    }

});

router.get("/admin/categories/edit/:id", adminAuth, (req, res) => {
    let id = req.params.id;
    if(isNaN(id)){
        res.redirect("/admin/categories");
    }
    Categorie.findByPk(id).then((categoria) => {
        if(categoria != undefined)
        {
            res.render("admin/categories/edit", { categoria: categoria });
        }
        else
        {
            res.redirect("/admin/categories");
        }
    }).catch(erro => {
        res.redirect("/admin/categories");
    })
});

router.post("/categories/update", adminAuth, (req, res) => {
    let id = req.body.id;
    let title = req.body.title_categorie

    Categorie.update({ title: title, slug: slugify(title) }, { 
        where: { id:id }
    }).then(() => {
        res.redirect("/admin/categories");
    });
});


module.exports = router;