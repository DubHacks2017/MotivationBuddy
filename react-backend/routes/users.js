var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("db/motivation_buddy.db", sqlite3.OPEN_READWRITE, function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log('init the DB');
});


/* POST users listing. */
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
        console.log('couldnt find users with userid ' + uid + ' name: ' + name + err);
        return;
      }
      console.log('Rows:' + rows);
      if(!rows || rows.length == 0) {
        db.run("INSERT INTO USERS VALUES(?, ?, ?)", [uid, name, email], function(err) {
          if(err) {
            console.log('couldnt insert into db: ' + err);
          }
        });
      }
    })
  });
})


module.exports = router;
