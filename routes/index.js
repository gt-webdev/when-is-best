var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = process.env.MONGOHQ_URL || "mongodb://localhost/whenisbest";


router.get('/', function(req, res) {
  res.render('index', {});
});

// Requests for creating an event
router.route('/event/create')
  .get(function(req, res) {
    // Parse out options passed in by landing page
    var eventType = req.query.type;

    if (eventType === "Weekly") {
      res.render('create_event', { 'weekly': true });
    }
    else {
      res.render('create_event',
        { 'weekly': false,
          'range': {
            start: req.query.startDate,
            end: req.query.endDate
          }
        });
    }

  })
  .post(function(req, res) {
    MongoClient.connect(url, function(err, db) {
      if(err){
        console.log('posting error to DB');
      }
      db.collection('events').insert(req.body,function(err){
        if(err){
          console.log('insert error to DB');
        }
      });
    });
    console.log('POST successful');
  });

router.get('/view-event', function(req, res) {
    res.render('view_event', {});
});

module.exports = router;
