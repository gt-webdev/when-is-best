var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {});
});

router.get('/create-event', function(req, res) {
  res.render("create_event", {});
});

module.exports = router;