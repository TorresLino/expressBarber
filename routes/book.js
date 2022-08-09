import express from "express";
const router = express.Router();

const services = [ //development and debug
{name: 'Normal Cut', info: 'Duration: 30 minutes', price: '$35', path: '/cut'},
{name: 'Machine Cut', info: 'Duration: 30 minutes', price: '$20', path: '/machine'},
{name: 'Beard', info: 'Duration: 30 minutes', price: '$25', path: '/beard'},
{name: 'Cut + Beard', info: 'Duration: 60 minutes', price: '$50', path: '/shave-and-a-haircut'}
];

router.get('/', function(req, res, next){
    req.ejs['pageName'] = "Book";
    req.ejs['services'] = services;
    
    res.render('book-services', req.ejs);
});

router.get('/:service', function(req, res, next){
    if(!services.map((s)=>{return s['path'].substring(1)}).includes(req.params['service']))
        next();
    else{
        req.ejs['pageName'] = "Book";
        req.ejs['service'] = req.params['service'];
        res.render('book-date', req.ejs);
    }
});

router.get('/:service/:date', function(req, res, next){
    if(!services.map((s)=>{return s['path'].substring(1)}).includes(req.params['service']))
        next();
    else{
        req.ejs['pageName'] = "Book";
        req.ejs['service'] = req.params['service'];
        req.ejs['date'] = req.params['date'];
        res.render('book-time', req.ejs);
    }
});

router.get('/:service/:date/:time', function(req, res, next){
    if(!services.map((s)=>{return s['path'].substring(1)}).includes(req.params['service']))
        next();
    else{
        req.ejs['pageName'] = "Book";
        req.ejs['service'] = req.params['service'];
        req.ejs['date'] = req.params['date'];
        req.ejs['barbers'] = ['John Smith', 'Arthur Lino', 'Eren Yager'];
        res.render('book-barber', req.ejs);
    }
});

router.get('/:service/:date/:time/:barber', function(req, res, next){
    if(!services.map((s)=>{return s['path'].substring(1)}).includes(req.params['service']))
        next();
    else{
        req.ejs['pageName'] = "Book";
        req.ejs['service'] = req.params['service'];
        req.ejs['date'] = req.params['date'];
        req.ejs['barber'] = req.params['barber'];
        res.render('book-barber', req.ejs);
    }
});


export default router;