var express = require('express'),
    router = express.Router(),
    mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    ObjectID = mongodb.ObjectID,
    config = require('../config'),
    moment = require('moment');

// Get an open meeting time for event with _id 
function getMeetingTimes(id){
  var meetingTimes,
      startDate,
      endDate,
      resDay,
      resStartSlot,
      resNumSlots;

  MongoClient.connect(config.mongo.url, function(err, db){
    if (err){
      console.log("db error");
    }
    db.collection("events").findOne({"_id" : ObjectID(id)},{},function(e, _event){
      startDate = moment(_event.start_date);
      endDate = moment(_event.end_date);

      // Creates 2d array of timeslots indexed by their date in between the event date range given
      for (var i = startDate; i.isBefore(endDate); i.add("days",1)){
        meetingTimes[i] = new Array(97);
        for (var j = 0; j < 97 ; j++){
          meetingTimes[i][j].numBusy = 0;
        }
      }

      // Iterate through each yes response and adds its occupied times to the array; 
      _event.responses.forEach(function(response){
        response.days.forEach(function(day){
          resDay = moment(day.date);

          day.times.forEach(function(time){
            resStartSlot = new moment(time["start"]).get("minutes") / 15;
            resNumSlots = parseInt(moment.duration(time["start"].diff(time.end)).get("minutes")) / 15;

            //for every time slot found increment the num of users busy for that slot
            for (var i = resStartSlot; i < (resStartSlot + resNumSlots) ; i++){
              meetingTimes[resDay][i].numBusy++;
              meetingTimes[resDay][i].people.push({
                name: response["name"],
                availibility: time.available
              });
            }
          }); 
        });
      }); 
    });
  });

  return meetingTimes;
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
