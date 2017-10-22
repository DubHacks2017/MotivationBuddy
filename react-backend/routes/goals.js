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
      console.log(rows);
      res.json(rows);
    });
  });
});

router.post('/', function(req, res){
  var email = req.body.email;
  var uid = req.body.uid;
  var name = req.body.name;

  if(!uid || !name) {
    console.log('email: ' + email + " uid: " + uid + ' name: ' + name);
    return;
  }

  db.serialize(function() {
    db.all("SELECT * from USERS WHERE fb_uid = ?", uid, function(err, rows) {
      if(err){
        console.log(err);
        return;
      }
      console.log(rows);
      if(rows.length == 0) {
        db.run("INSERT INTO USERS VALUES(?, ?, ?)", uid, name, email, function(err) {
          console.log(err);
        });
      }
    })
  });
})

module.exports = router;
