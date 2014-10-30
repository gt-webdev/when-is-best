var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var jade = require('jade');
var port = process.env.PORT || 3000;
var url = process.env.MONGOHQ_URL || "mongodb://localhost/whenisbest";
var mandrill_key = process.env.API_KEY || "Vft8M4IwFNwKV_iRYRlORw"


var router = require('./routes');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.use(bodyParser.json());

//middleware function for router
app.use(function(req,res,next){
    next();
});

app.use('/',router);

app.listen(port);
console.log("Hey! You are running on port " + port);

module.exports = app;
