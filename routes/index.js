var express = require('express');
var router = express.Router();
var config = require('../config');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(config.mandrill_api_key);
var moment = require('moment');
var events = require("./events");

router.get('/', function(req, res) {
  res.render('index', {});
});

router.use('/event',events);

router.get('/mail', function(req, res) {
    var message = {
        "html": "<p>Example HTML content</p>",
        "text": req.query.description,
        "subject": req.query.event_name,
        "from_email": req.query.creator_email,
        "from_name": req.query.creator_name,
        "to": [{
                "email": req.query.member_email,
                "type": "to"
            }],
        "headers": {
            "Reply-To": req.query.creator_email
        }
    };
    mandrill_client.messages.send({"message": message}, function(result) {
        console.log(result);
    });
});

router.get('/view-event', function(req, res) {
    res.render('view_event', {'moment' : moment});
});

//route to view a session's saved event in JSON form
router.get("/history", function(req, res) {
    res.end(JSON.stringify(req.session.eventArray));
});

module.exports = router;
