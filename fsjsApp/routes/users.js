var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:password@ds125255.mlab.com:25255/timesheet');
var db = mongoose.connection;

//var kittySchema = mongoose.Schema({
//  name: String
//});
//var Kitten = mongoose.model('Kitten', kittySchema);
//
//
//var database = {
//    thing: 1
//}

// GET
router.get('/timestamps', function(req, res, next) {
  console.log(req.query)
    res.send('received the input')
});

//create or POST
router.post('/timestamps', function(req, res, next){
   console.log(req.body)
    var timeSchema = mongoose.Schema({
        date: Date, userId:Number
    });
    var Timestamp = mongoose.model('Timestamp', timeSchema);
    var timestamp = new Timestamp({ userId: 5764356 });
    console.log(timestamp.userId); 
    timestamp.save(function (err, timestamp) {
        if (err) return console.error(err);
      });
    res.send('do not cry')
});

router.get('/')

module.exports = router;
