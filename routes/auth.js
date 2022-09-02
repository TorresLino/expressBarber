import express, { response } from "express";
const router = express.Router();
import axios from 'axios';

router.get('/signup', function(req, res, next){
    req.ejs['pageName'] = 'Signup';
    res.render('signup', req.ejs);
});

router.post('/signup', function(req, res, next){
    req.body.firstName = req.body.firstName.trim();
    req.body.email = req.body.email.trim();
    if(!req.body.firstName || !req.body.email || !req.body.firstName.match(/[a-z]{2,}/ig)){
        req.ejs['pageName'] = 'Signup';
        req.ejs['message'] = 'Invalid inputs.';        
        res.render('signup', req.ejs);
    }
    else{        
        axios.get('http://localhost:8000/api/user').then( apiRes => {
            const registeredEmails = apiRes.data.map(x => x.email);
            if(registeredEmails.includes(req.body.email)){                
                req.ejs['pageName'] = 'Signup';
                req.ejs['message'] = 'This email is already in use.';
                res.render('signup', req.ejs);
            }
            else{
                axios.post('http://localhost:8000/api/user', {
                    firstName: req.body.firstName,
                    email: req.body.email
                })
                .then( (response) => {
                    res.redirect('/');
                }).catch( (error) => {                                    
                    req.ejs['pageName'] = 'Signup';
                    req.ejs['message'] = 'Error creating user.';
                    res.render('signup', req.ejs);
                })
            }
        })
    }
});

router.get('/login', function(req, res, next){
    req.ejs['pageName'] = 'Login';
    res.render('login', req.ejs);
});

router.post('/login', function(req, res, next){
    if(!req.body.email){
        req.ejs['pageName'] = 'Login';
        req.ejs['message'] = 'Invalid inputs.';
        res.render('login', req.ejs);
    }
    else{
        axios.get('http://localhost:8000/api/user').then( apiRes => {
            apiRes.data.filter((user) => {
                if(user.email == req.body.email){
                    req.session.user = user;
                    res.redirect('/');
                }
            })
            req.ejs['pageName'] = 'Login';
            req.ejs['message'] = 'User does not exist.';
            res.render('login', req.ejs);
        })
    }
});

router.get('/logout', function(req, res, next){
    req.session.destroy();
    res.redirect('/authentication/login');
})

export default router;