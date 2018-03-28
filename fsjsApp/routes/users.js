var express = require('express');
var router = express.Router();

// Import all models
var TimeStamp = require('./model.js');

// GET
router.get('/timestamps', function(req, res, next) {
  console.log(req.query)
    res.send('received the input.')
});

//create or POST
router.post('/timestamps', function(req, res, next){
   console.log(req.body)

// this relates to schema---look in routes/model.js
    var timestamp = new Timestamp({ userId: 5764356 });
    console.log(timestamp.userId); 
    timestamp.save(function (err, timestamp) {
        if (err) return console.error(err);
      });
    res.send('Created the new input.');
});

// PUT-- Do I need to add additional after /timestamps?

//router.put('/timestamps', function(req, res, next){
//res.send('Making changes to the input' '$req.params.'`)    
//});

// DELETE
//router.delete('/timestamps', function(req, res, next){
//res.send('Deleting the input' '$req.params.'`)

//});

router.get('/')

module.exports = router;
