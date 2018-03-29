var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

// Import all models
var TimeStamp = require('./model.js');

// GET
router.get('/timestamps', function(req, res, next) {
    console.log(req.query)
    res.send('received the input.')
 //   var user = db.collection('').find().toArray(function(err, results){
//   console.log() })
});

//create or POST
router.post('/timestamps', function(req, res, next){
    console.log(req.body)
    try
    {
    // this relates to schema---look in routes/model.js
        var timestamp = mongoose.model('Timestamp');
        const timestampData = {
              userId: 5764356 
        };
         
        timestamp.create(timestampData, function(err, newTimestamp) {
            if (err) return console.error(err);
        });
        res.send('Created the new input.');
    }
    catch(ex)
    {
        console.log(ex)
    }
});
// PUT-- Do I need to add additional after /timestamps?

router.put('/timestamps', function(req, res, next){
res.send('Making changes to the input' '$req.params.')    
});

// DELETE
router.delete('/timestamps', function(req, res, next){
res.send('Deleting the input' '$req.params.')

});

router.get('/')

module.exports = router;
