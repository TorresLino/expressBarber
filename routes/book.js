import express from "express";
const router = express.Router();
import axios from 'axios';

const services = [ //development and debug
{name: 'Normal Cut', info: 'Duration: 30 minutes', price: '$35', code: 'cut'},
{name: 'Machine Cut', info: 'Duration: 30 minutes', price: '$20', code: 'machine'},
{name: 'Beard', info: 'Duration: 30 minutes', price: '$25', code: 'beard'},
{name: 'Cut + Beard', info: 'Duration: 60 minutes', price: '$50', code: 'shave-and-a-haircut'}
];

const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

router.get('/', function(req, res, next){
    req.ejs['pageName'] = "Book";
    req.ejs['services'] = services;
    
    res.render('book', req.ejs);
});

router.get('/services', function(req, res, next){
    axios.get('http://localhost:8000/api/service')
        .then(apiRes => {
            req.ejs['data'] = apiRes.data;
            req.ejs['subject'] = "service";
        
            res.render('../public/components/list-component.ejs', req.ejs);
        })    
})

router.get('/date', function(req, res, next){    
    var dates = [];
    var date = new Date(); //today
    for(let i=0; i < 15; i++){
        dates.push({
            name: (date.getMonth() + 1) +'/'+ date.getDate(),
            description: daysOfTheWeek[date.getDay()],
            code: date.toISOString()});
        date.setDate(date.getDate() + 1)
    }
    
    req.ejs['data'] = dates;
    req.ejs['subject'] = 'date';

    res.render('../public/components/tiles-component.ejs', req.ejs);
})

router.get('/time', function(req, res, next){    
    req.ejs['services'] = services;

    res.render('../public/components/list-component.ejs', req.ejs);
})

router.get('/barber', function(req, res, next){    
    req.ejs['services'] = services;

    res.render('../public/components/list-component.ejs', req.ejs);
})

router.get('/confirm', function(req, res, next){    
    req.ejs['services'] = services;

    res.render('../public/components/list-component.ejs', req.ejs);
})

/*router.get('/:service', function(req, res, next){
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
});*/


export default router;