const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('./User');

router.get("/admin/users", (req, res) => {
    User.findAll().then((users) => {
        res.render("admin/users/index", { users: users});
    }) 
});

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create")
});

router.post("/users/create", (req, res) => {
    let email = req.body.email;
    let pwd = req.body.pwd;

    User.findOne({where: {email, email}}).then( user => {
        if ( user == undefined ) {
            let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(pwd, salt);
            
            User.create({
                email: email,
                password: hash,
            }).then(() => {
                res.redirect("/");
            }).catch(err => {
                res.redirect("/");
            });
        } else {            
            res.render("admin/users/erro")
        }
    });  

});

router.get("/login", (req, res) => {
    res.render("admin/users/login");
});
router.post("/authenticate", (req, res) => {
    let email = req.body.email;
    let password = req.body.pwd;

    User.findOne({ where: { email: email }}).then((user) => {
        if (user != undefined){
            let correct = bcrypt.compareSync(password, user.password);
            if (correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.json(req.session.user)
            } else {
                res.redirect("/login")
            }
        } else {
            res.redirect("/login")
        }
    })
});

module.exports = router;