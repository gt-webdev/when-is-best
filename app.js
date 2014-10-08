var express = require('express');
var app = express();
var fs = require('fs');
var jade = require('jade');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

app.get('/', function(req, res) {
	res.render('index', {});
});

app.get('/create-event', function(req, res) {
	res.render("create_event", {});
});

app.listen(3000);
