let router = require('express').Router();
let Utils = require('../services/utils');

Utils.getRouteWithUser("/", router, (req, res, user, err) => {
    res.render("home", {user: user});
});

module.exports = router;
