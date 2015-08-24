// REQUIRE PACKAGES ============================================================
var express    = require('express');
var bodyParser = require('body-parser');
var morgan     = require('morgan');

var app = express();

var Quote = require('./app/models/quote.js');

// CONFIGURE APP TO USE BODY PARSER ============================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// PORT SETUP ==================================================================
var port = process.env.PORT || 8080;

// DATABASE CONNECTION SETUP ===================================================
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:password@ds059692.mongolab.com:59692/famous-qoutes-db');

// ROUTES FOR API ==============================================================
// create instance of the express Router
var router = express.Router();

// MIDDLEWARE ==================================================================
router.use('/', function(req, res, next){
  console.log('Middleware is working');
  // next() tells our app to continue to the next route, otherwise it stops here
  next();
});

// @ /api ======================================================================
router.get('/', function(req, res){
  res.json({ message: 'Welcome to our API!'});
});

// CRUD FOR QUOTES =============================================================
// @ /api/quotes
router.route('/quotes')

  // CREATE A QUOTE
  .post(function(req, res){
    var quote = new Quote();  // create new instance of Quote model
    quote.author = req.body.author;
    quote.text = req.body.text;
    quote.save(function(err){
      if(err) res.send(err);
      res.json({ message: 'Quote created successfully!'});
    });
  })

  .get(function(req, res){
    Quote.find(function(err, quotes){
      if(err) res.send(err);
      res.json(quotes);
    });
  })

// @ /api/quotes/:id
router.route('/quotes/:id')

  // GET ONE QUOTE BY ID
  .get(function(req, res){
    Quote.findById(req.params.id, function(err, quote){
      if(err) res.send(err);
      res.json(quote);
    });
  })

  // UPDATE ONE QUOTE BY ID
  .put(function(req, res){
    Quote.findById(req.params.id, function(err, quote){
      if(err) res.send(err);
      quote.author = req.body.author;
      quote.text = req.body.text;
      quote.save(function(err){
        if(err) res.send(err);
        res.json({ message: 'Quote edited succesfully!'});
      });
    });
  })

  // DELETE ONE QUOTE BY ID
  .delete(function(req, res){
    Quote.remove({_id: req.params.id}, function(err, quote){
      if(err) res.send(err);
      res.json({ message: 'Quote deleted successfully!'});
    });
  })

// REGISTER ROUTES =============================================================
// all routes prefixed with /api
app.use('/api', router);

// START SERVER ================================================================
app.listen(port);
console.log('Listening to PORT ' + port);
