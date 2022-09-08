import express from "express";
const router = express.Router();
import axios from "axios";
import checkSignIn from '../public/javascript/checkSignIn.js'

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

router.get('/list-bookings', checkSignIn, function(req, res, next){
    var date = new Date(); //today
    date = new Date(date - date.getTimezoneOffset() * 60 * 1000)
    date = date.toISOString().split('T')[0]
    axios.all([
        axios.get('http://localhost:8000/api/booking-by-user/'+req.session.user.id+'/'+date),
        axios.get('http://localhost:8000/api/barber'),
        axios.get('http://localhost:8000/api/timeSlot'),
        axios.get('http://localhost:8000/api/service')])
        .then(axios.spread((...responses) => {
            const bookings = responses[0].data
            var barbers = {};   for(const b of responses[1].data) barbers[b.id] = b.displayName;
            var timeSlots = {}; for(const t of responses[2].data) timeSlots[t.id] = t.time;
            var services = {};  for(const s of responses[3].data) services[s.id] = s.name;

            var data = [];
            for(const b of bookings){
                var bDate = new Date(b.date);
                bDate = new Date(bDate - bDate.getTimezoneOffset() * 60 * 1000);
                data.push({
                    id: b.id,
                    name: (bDate.getMonth() + 1) +'/'+ bDate.getDate() + ' - ' + timeSlots[b.timeSlotID],
                    description: services[b.serviceID],
                    price: 'Barber: ' + barbers[b.barberID]
                })
            }

            req.ejs['pageName'] = 'Bookings'
            req.ejs['data'] = data;
            res.render('view-bookings', req.ejs);
        }))
})

router.post('/list-bookings', checkSignIn, function(req, res, next){
    var date = new Date(); //today
    date = new Date(date - date.getTimezoneOffset() * 60 * 1000)
    date = date.toISOString().split('T')[0]
    axios.get('http://localhost:8000/api/booking-by-user/'+req.session.user.id+'/'+date)
    .then(async apiRes =>{
        for(var b of apiRes.data){
            if(b.id == req.body.bookingID){
                await axios.delete('http://localhost:8000/api/booking/' + b.id)
                break;
            }
        }
    })

    res.redirect('/list-bookings');
})

export default router;