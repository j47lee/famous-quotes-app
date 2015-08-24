// REQUIRE PACKAGES ============================================================
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var morgan     = require('morgan');

var app = express();

// CONFIGURE APP TO USE BODY PARSER ============================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// PORT SETUP ==================================================================
var port = process.env.PORT || 8080;

// ROUTES FOR API ==============================================================
var router = express.Router();

router.get('/', function(req, res){
  res.json({ message: 'Welcome to our API!'});
});

// REGISTER ROUTES =============================================================
// all routes prefixed with /api
app.use('/api', router);

// START SERVER ================================================================
app.listen(port);
console.log('Listening to PORT ' + port);
