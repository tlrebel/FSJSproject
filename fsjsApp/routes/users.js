var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

// Import all models
var TimeStamp = require('./model.js');

// GET all files in DB
router.get('/timestamps', function(req, res, next) {
    const timeDate = mongoose.model('Timestamp');
    timeDate.find(function(err, timestamps){
        if(err){
            console.log(err);
            return res.status(500).json(err);
        }
        res.json(timestamps);
        console.log(req.query)
    });
});

// GET one file via id as a url param
router.get('/timestamps/:timeId', function(req, res, next){
    const {timestampsId} = req.params;
    const timeId = mongoose.model('Timestamp');
    if (!timeId){
        return res.status(404).end('Could not find the timestamp `${timeId}`');
    }
    res.json(file);
});

//create or POST
router.post('/timestamps', function(req, res, next){
    console.log(req.body)
    try
    {
    // this relates to schema---look in routes/model.js
        const timestamp = mongoose.model('Timestamp');
        const timestampData = {
              userId: req.body.number,
                date: new Date()
        };
         
        timestamp.create(timestampData, function(err, newTimestamp) {
            if (err) return console.error(err);
            res.json(newTimestamp);
        });
     
    }
    catch(ex)
    {
        console.log(ex)
    }
});

// PUT-- update timestamp data
router.put('/timestamps/:timeId', function(req, res, next){
    const timestamp = mongoose.model('Timestamp');
    const timeId = req.params.timeId;
    
    timestamp.findbyId(timeId, function(err, ts){
        if(err){
            console.error(err);
            return res.status(500).json(err);
        }
        if (!ts) {
            return res.status(404).json({message: 'Date not found'});
        }
        ts.date = req.body.date;
        ts.userId = req.body.userId;
        
        ts.save(function(err, savedts){
            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }
            res.json(savedts);
        })
    })  
});


// DELETE the data
router.delete('/timestamps/:timeId', function(req, res, next){
    try{
        const timestamp = mongoose.model('Timestamp');
        const timeId = req.params.timeId;
          console.log(req.params);
        timestamp.findById(timeId, function(err, ts){
            if (err){
                console.log(err);
                return res.status(500).json(err);
            }
            if (!ts){
                return res.status(404).json({
                    message: 'date not found'
                });
            }
            ts.remove(function(err, ts){
                res.json('deleted');
               
            })
        })
    } catch(e) {
        console.error(e);
    }
});

router.get('/')

module.exports = router;
