const config = require("../config.json");
let express = require('express');
let router = express.Router();

router.use("/", require("./home"));
router.use("/login", require("./login"));

router.get("/logout", (req, res) => {
    req.session.userId = null;
    res.redirect("/");
});

module.exports = router;
