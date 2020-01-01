let router = require('express').Router();
let User = require('../models/user');
let utils = require('../services/utils');
let Post = require('../models/post');
let faker = require('faker');

utils.getRouteWithUser('/', router, (req, res, user) => {
    if(user === null) return res.redirect("/login");
    Post.find({}, (err, posts) => {
        res.render("home", {
            user: user,
            posts: posts
        });
    });
});

router.get("/get/:id", (req, res) => {
    User.findOne({username: req.params.id}, (err, usr) => {
        res.send(usr.interests);
    });
});


module.exports = router;
