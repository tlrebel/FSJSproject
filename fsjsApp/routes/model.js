const mongoose = require('mongoose');
var timeSchema = mongoose.Schema({
        date: Date, 
        userId: Number,
        type: String
    });

var Timestamp = mongoose.model('Timestamp', timeSchema);
module.exports = Timestamp;