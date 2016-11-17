var express = require('express');
var app = express();
var mongodb = require('mongodb');
var monk = require('monk');
var database = monk('localhost:27017/pokemon');


var runport = require('./runport');
var savedata = require('./save');


//To connect database mongodb
app.use(function(req, res, next){
	req.db = database;
	console.log('connnect in database mongodb use monk');
	next();
});

//Use Template Engine Jade
//app.set('view engine', 'jade');
/*Important, use template engine not use in case,
  case in application show views*/

//Call to function an save names to database
app.post('/', function(req, res, next){
	savedata(req, res, next);
});


app.listen(runport(), function(){
	console.log('run server: ' + runport());
});