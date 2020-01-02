let router = require('express').Router();
let Utils = require('../services/utils');
let User = require('../models/user');

Utils.getRouteWithUser("/settings", router, (req, res, user, err) => {
    res.render("settings", {user: user});
});

module.exports = router;
