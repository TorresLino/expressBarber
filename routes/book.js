const express = require("express");
const router = express.Router();

router.get('/', function(req, res, next){
    req.ejs['pageName'] = "Book"
    res.render('index', req.ejs);
});

module.exports = router;