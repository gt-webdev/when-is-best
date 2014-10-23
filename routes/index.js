var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = process.env.MONGOHQ_URL || "mongodb://localhost/whenisbest";


router.get('/', function(req, res) {
  res.render('index', {});
});

router.route('/event/create')
  .get(function(req, res) {
    res.render('create_event', {});
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

module.exports = router;
