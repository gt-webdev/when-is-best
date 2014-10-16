var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {});
});

router.get('/create-event', function(req, res) {
  res.render("create_event", {});
});

router.post('/create-event', function(req, res) {
  console.log(req.body);
  res.json({"event-id": 1234324});
});

module.exports = router;
