var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('demo', { title: 'Express' });
  var myFirebaseRef = new Firebase("https://fbhack.firebaseIO.com");
});

module.exports = router;
