var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var jade = require('jade');
var config = require('./config');


var router = require('./routes');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.use(bodyParser.json());

//middleware function for router
app.use(function(req,res,next){
    next();
});

app.use('/',router);

app.listen(config.port);
console.log("Hey! You are running on port " + config.port);

module.exports = app;
