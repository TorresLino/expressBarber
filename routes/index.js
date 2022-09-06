import express from "express";
const router = express.Router();
import axios from "axios";

router.get('/', function(req, res, next){
    axios.get('http://localhost:8000/api/service')
        .then(apiRes => {
            var displayServices = []
            for(var s in apiRes.data){
                var service = apiRes.data[s];
                displayServices.push({
                    name: service.name,
                    price: '$ ' + service.price
                })
            }

            req.ejs['services'] = displayServices;
            req.ejs['pageName'] = "Home"
        
            res.render('index', req.ejs);
        })  
});

router.get('/list-bookings', function(req, res, next){
    console.log('kansado')
    res.status(200).send('funcionou')
})

export default router;