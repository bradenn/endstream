let router = require('express').Router();
let Utils = require('../services/utils');
let User = require('../models/user');

Utils.getRouteWithUser("/:user", router, (req, res, user, err) => {
    User.findOne({ username: req.params.user }, (err, target) => {
        res.render("user", {user: user, target: target});
    });
});

module.exports = router;
