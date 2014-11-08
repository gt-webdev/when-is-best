var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var jade = require('jade');
var config = require('./config');
var session = require("express-session");
var cookieparser = require("cookie-parser");
var MongoStore = require('connect-mongo')(session);

var router = require('./routes');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.use(bodyParser.json());

//the ingredients for making cookies
    app.use(cookieparser());
    //create a session hooked up to mongodb
    app.use(session({
      store: new MongoStore({
        url: config.mongo.url
      }),
      secret: '1234567890QWERTYfd',
      autoreconnect: true,
      resave: true,
      saveUninitialized: true,
    }, function () {
        console.log("db connection open");
      }));

//middleware function for router
app.use(function(req,res,next){
    
    //if eventIndex hasn't been created in this session...
    if(!req.session.eventIndex) {
        //create an eventIndex and eventArray
        req.session.eventIndex = 0;
        req.session.eventArray = [];
    }
    
    //move on to the next function
    next();
});

app.use('/',router);

var server = app.listen(config.port, function() {
    console.log("Listening on port " + config.port);
});

module.exports = app;
