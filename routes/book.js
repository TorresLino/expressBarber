import express from "express";
const router = express.Router();
import axios from 'axios';
import { unavailableBarbers, unavailableDate } from "../public/javascript/barberAvailability.js";

const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

router.get('/', function(req, res, next){
    req.ejs['pageName'] = "Book";
    
    res.render('book', req.ejs);
});

router.get('/services', function(req, res, next){
    axios.get('http://localhost:8000/api/service')
        .then(apiRes => {
            var displayServices = []
            for(var s in apiRes.data){
                var service = apiRes.data[s];
                displayServices.push({
                    code: service.code,
                    name: service.name,
                    description: service.description,
                    price: '$ ' + service.price
                })
            }

            req.ejs['data'] = displayServices;
            req.ejs['subject'] = "service";
        
            res.render('../public/components/list-component.ejs', req.ejs);
        })    
})

router.get('/date', function(req, res, next){    
    var dates = [];
    var date = new Date(); //today
    date = new Date(date - date.getTimezoneOffset() * 60 * 1000)
    for(let i=0; i < 15; i++){
        dates.push({
            name: (date.getMonth() + 1) +'/'+ date.getDate(),
            description: daysOfTheWeek[date.getDay()],
            code: date.toISOString().split('T')[0]});
        date.setDate(date.getDate() + 1)
    }
    
    req.ejs['data'] = dates;
    req.ejs['subject'] = 'date';

    res.render('../public/components/tiles-component.ejs', req.ejs);
})

router.get('/time/:code/:date', function(req, res, next){
    axios.all([
        axios.get('http://localhost:8000/api/booking-times/' + req.params.date),
        axios.get('http://localhost:8000/api/service-slots/' + req.params.code),
        axios.get('http://localhost:8000/api/timeSlot'),
        axios.get('http://localhost:8000/api/barber')])
        .then(axios.spread((...responses) => {
            const bookedSlots = responses[0].data;
            const serviceSlotSize = responses[1].data[0].timeSlots;
            const allSlots = responses[2].data;
            const barbers = responses[3].data.map(x => x.id);

            var displaySlots = []
            for(var i in allSlots){
                displaySlots.push({
                    name: allSlots[i].time,
                    description: '',
                    code: allSlots[i].id,
                    disabled: unavailableDate(i, allSlots.map(x => x.id), bookedSlots, serviceSlotSize, barbers)
                })
            }
            req.ejs['subject'] = 'time'
            req.ejs['data'] = displaySlots;
            res.render('../public/components/tiles-component.ejs', req.ejs);
        }
    ))
})

router.get('/barber/:code/:date/:slot', function(req, res, next){    
    axios.all([
        axios.get('http://localhost:8000/api/booking-times/' + req.params.date),
        axios.get('http://localhost:8000/api/service-slots/' + req.params.code),
        axios.get('http://localhost:8000/api/timeSlot'),
        axios.get('http://localhost:8000/api/barber')])
        .then(axios.spread((...responses) => {
            const bookedSlots = responses[0].data;
            const serviceSlotSize = responses[1].data[0].timeSlots;
            const allSlots = responses[2].data.map(x => x.id);
            const barbers = responses[3].data;
            var busyBarbers = unavailableBarbers(allSlots.indexOf(parseInt(req.params.slot)), allSlots, bookedSlots, serviceSlotSize);

            var displayBarbers = []
            for(var b in barbers){
                var barber = barbers[b];
                if(!busyBarbers.includes(barber.id)){
                    displayBarbers.push({
                        code: barber.id,
                        name: barber.displayName,
                        description: '',
                        price: ''
                    })
                }
            }
            if(displayBarbers.length > 1){
                displayBarbers = [
                    {
                        code: displayBarbers[Math.floor(Math.random()*displayBarbers.length)].code,
                        name: 'No preference',
                        description: 'Select one of the barbers at random',
                        price: ''
                    },
                    ...displayBarbers
                ]            
            }
            
            req.ejs['subject'] = 'barber';
            req.ejs['data'] = displayBarbers;
            res.render('../public/components/list-component.ejs', req.ejs);
        }
    ))
});

//continue from here
router.get('/confirm/:code/:date/:time/:barber', function(req, res, next){    
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