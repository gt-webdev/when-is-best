var express = require('express');
var app = express();
var fs = require('fs');
var jade = require('jade');
var port = process.env.PORT || 3000;
var db = process.env.MONGOHQ_URI || "mongodb://localhost/whenisbest";

var router = require('./routes');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

//middleware function for router
app.use(function(req,res,next){
    next();
});

app.use('/',router);

app.listen(port);
console.log("Hey! You are running on port " + port);