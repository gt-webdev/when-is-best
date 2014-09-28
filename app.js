var express = require('express');
var app = express();
var fs = require('fs');
var jade = require('jade');

app.get('/', function(req, res) {
	var fn = jade.compileFile('index.jade',{});
	fs.readFile("style.css", null,function (err, data) {
		res.send(fn({css:data}));
	});
});

app.listen(3000);
