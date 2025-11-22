var express = require('express');
var router = express.Router(); // configuring express module for routing

/* GET home page using '/' */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Announcements' });
});

/* GET home page using '/home' */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Announcements'});
});

/* GET how-to page */
router.get('/how-to', function(req, res, next) {
  res.render('how-to', { title: 'How to Navigate'});
});

/* GET help page */
router.get('/help', function(req, res, next) {
  res.render('help', { title: 'Contact Us'});
});

module.exports = router;