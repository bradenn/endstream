let router = require('express').Router();
let Utils = require('../services/utils');
let Stream = require('../models/stream');

Utils.getRouteWithUser("/", router, (req, res, user, err) => {
    Stream.find({}, (err, streams) => {
        console.log(err);
        res.render("home", {user: user, streams: streams});
    });
});

module.exports = router;
