const express = require("express");
const router = express.Router();


router.get("/categories", (req, res) => {
    res.send("Categorias");
});

router.get("/admin/categories/new", (req, res) => {
    res.send("Criação de novas categorias");
});

module.exports = router;