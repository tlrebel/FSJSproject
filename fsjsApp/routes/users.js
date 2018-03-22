var express = require('express');
var router = express.Router();

///* GET users listing. */
//router.get('/', function(req, res, next) {
//  database.thing = database.thing + 1
//  res.send(database);
//});

var database = {
    thing: 1
}

router.get('/timestamps', function(req, res, next) {
  res.send('awehfoiawehf')
});


router.get('/thing', function(req, res, next) {
  database.thing = database.thing + 1
  res.send(database);
});

router.get('/thing3', function(req, res, next) {
  database.thing = database.thing + 3
  res.send(database);
});

module.exports = router;
