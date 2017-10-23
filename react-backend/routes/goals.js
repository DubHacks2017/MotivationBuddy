var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("db/motivation_buddy.db", sqlite3.OPEN_READWRITE, function(err) {
  if (err) {
    return console.log(err.message);
  }
  console.log('init the DB');
});

router.post("/", function(req, res) {
  var desc = req.body.personalGoal;
  var requester_uid = req.body.requester_uid;
  var buddy_id = req.body.buddy_id;
  var date = req.body.date;
  var points = req.body.points;
  var reward = req.body.reward;

  if(!desc || !buddy_id || !date || !(points || reward)) {
    console.log('desc: ' + desc + ' buddy_id: ' + buddy_id
    + ' date: ' + date + ' points: ' + points + ' reward: ' + reward);
    return;
  }

  db.serialize(function() {
    db.all("SELECT MAX(goal_id) AS max FROM GOALS", function(err, rows) {
      if(err) {
        console.log(err);
        return;
      }
      var nextGoalId = 1;
      if(rows) {
        console.log('Rows = ' + rows);
        nextGoalId = rows[0].max + 1;
      }
      var params = [nextGoalId, requester_uid, buddy_id, desc, 0, date, points, reward];
      db.run("INSERT INTO goals VALUES(?, ?, ?, ?, ?, ?, ?, ?)", params, function(err) {
        if(err) {
          console.log(err);
        }
      })
    });
  });

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
      console.log(rows);
      res.json(rows);
    });
  });
});


module.exports = router;
