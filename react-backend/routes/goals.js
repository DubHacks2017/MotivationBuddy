var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("db/motivation_buddy.db", sqlite3.OPEN_READWRITE, function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log('init the DB');
});


router.get("/", function(req, res, next) {
  var uid = req.query.uid;
  if(!uid) {
    res.status(403);
    res.send('Not logged in...');
    return;
  }

  console.log('uid is ' + uid);

  db.serialize(function() {
    db.all("SELECT * FROM goals WHERE requester_fb_uid = ?", uid, function(err, rows) {
      if(err) {
        return console.log(err);
      }
      res.json(rows);
    });
  });
});

module.exports = router;
