var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var client = mongodb.MongoClient;
var url = process.env.MONGOHQ_URI || "mongodb://localhost/whenisbest";

console.log(process.env);
var insertDocs = function(db,item,callback){

  console.log(item);

  var collection = db.collection('test');

  collection.insert(item,function(err,result){
    if(err)
      console.log(err);
    else
      console.log('success');

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
  client.connect(url, function(err, db) {
    if(err)
      console.log(err);
    req.body._id = "123123123123123";

    var test = {
       _id:"234234",
       att:"safasdf"
    }

    insertDocs(db,req.body,function(){
      db.close();
    });
  });

  res.json({"event-id": 1234324});
});

module.exports = router;