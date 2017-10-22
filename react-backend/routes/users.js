var express = require('express');
var router = express.Router();

var users = [{
  id: 1,
  username: "samsepi0l"
}, {
  id: 2,
  username: "D0loresH4ze"
}];


/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
//res.send('respond with a resource');

  // And insert something like this instead:
  // if(Math.random() < 0.9) {
  //   users.push({
  //     id: 3,
  //     username: 'nihal'
  //   });
  // }

  res.json(users);

module.exports = router;
