// BASIC SETUP
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();
