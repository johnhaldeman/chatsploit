
var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

router.post('/', 
  passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/',
  function(req, res){
    res.render('login');
  });

module.exports = router;
