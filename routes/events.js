var express = require('express'),
    router = express.Router(),
    mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    ObjectID = mongodb.ObjectID,
    config = require('../config'),
    moment = require('moment');

//Get an open meeting time for event with _id 
function getMeetingTime(id){
  var potentialTimes;
      day,
      minutes,
      startSlot,
      numSlots;

  MongoClient.connect(config.mongo.url, function(err, db){
    if(err){
      console.log("db error");
    }
    db.collection("events").findOne({"_id" : ObjectID(id)},{},function(e, event){

      // Initialize all potential timeslots of event to 0 (num of people busy during timeslot)
      var daysDiff = parseInt(moment.duration(event.startDate.diff(event.endDate)).get("days"));
      potentialTimes = new Array(daysDiff);

      for (var i = 0; i < daysDiff; i++){
        potentialTimes[i] = new Array(97);
        for (var j = 0; j < 97 ; j++){
          potentialTimes[i][j] = 0;
        }
      }

      event.yes_responses.forEach(function(reponse){

        day = parseInt(moment.duration(event.startDate.diff(reponse.date)).get("days"));
        response.times.forEach(function(time){

          minutes = parseInt(moment.duration(time.start.diff(time.end)).get("minutes"));  
          startSlot = new moment(time.start).get("minutes") / 15;
          numSlots = minutes / 15;

          //for every time slot found increment the num of users busy for that slot(implement user name display later)
          for (var i = startSlot; i < (startSlot + numSlots) ; i++){
            potentialTimes[day][i]++;
          }
        });
      }); 
    });
  });
}

router.route("/create")
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
  .post(function(req, res){
    MongoClient.connect(config.mongo.url, function(err, db) {
      if(err){
        console.log('posting error to DB');
      }
      //I will add this event to the eventArray stored in our session
        req.session.eventArray[req.session.eventIndex++] = req.body;
        
      //Add the event to the 'events' collection
      var newId = new ObjectID();
      req.body._id =  newId;

      db.collection('events').insert(req.body,function(err){
        if(err){
          console.log('insert error to DB');
        }
        res.json({
          "event-id": newId
        });
      });
    });
    console.log('POST successful');
  });

module.exports = router;
