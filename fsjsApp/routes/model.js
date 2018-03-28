const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:password@ds125255.mlab.com:25255/timesheet');
var db = mongoose.connection; 
var timeSchema = mongoose.Schema({
        date: Date, 
        userId:Number
    });

var Timestamp = mongoose.model('Timestamp', timeSchema);
module.exports = Timestamp;