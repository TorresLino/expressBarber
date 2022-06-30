const express = require("express");
const router = express.Router();

router.get('/', function(req, res, next){
    req.ejs['pageName'] = "Home"
    res.render('index', req.ejs);
});

module.exports = router;