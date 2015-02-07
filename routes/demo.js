var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('demo', { title: 'Express' });
  var myFirebaseRef = new Firebase("https://<your-firebase>.firebaseio.com/");
});

module.exports = router;
