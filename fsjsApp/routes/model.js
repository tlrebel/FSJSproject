const mongoose = require('mongoose');  
var timeSchema = mongoose.Schema({
        date: Date, 
        userId:Number
    });

var Timestamp = mongoose.model('Timestamp', timeSchema);
module.exports = Timestamp;