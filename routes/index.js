var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var client = mongodb.MongoClient;
var url = process.env.MONGOHQ_URL || "mongodb://localhost/whenisbest";

var insertDocs = function(db,docs,collection,callback){

  var collection = db.collection(collection);

  collection.insert(docs,function(err,result){
    if(err)
      console.log(err);

    callback(result);
  });
}

router.get('/', function(req, res) {
  res.render('index', {});
});

router.get('/create-event', function(req, res) {
  res.render('create_event', {});
});

router.post('/create-event', function(req, res) {
    console.log(req.body);
  client.connect(url, function(err, db) {
    if(err)
      console.log(err);

    insertDocs(db,req.body,'test',function(){
      db.close();
    });
  });
});

module.exports = router;
