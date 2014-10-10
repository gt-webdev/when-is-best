var express = require('express');
var app = express();
var fs = require('fs');
var jade = require('jade');

var router = require('./routes');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

//middleware function for router
app.use(function(req,res,next){
    next();
});

app.use('/',router);

app.listen(3000);