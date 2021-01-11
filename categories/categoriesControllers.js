const express = require("express");
const slugify = require("slugify") // deixa a string em um modelo url
const router = express.Router();
const Categorie = require('./categorie');


router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

router.post("/categories/save", (req, res) => {
    let title = req.body.title_categorie;
    if(title != undefined)
    {
        Categorie.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/");
        });
    }
    else
    {
        res.redirect("/admin/categories/new");
    }
})
module.exports = router;