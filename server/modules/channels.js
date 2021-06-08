const mongoose = require('mongoose');
var validate = require('mongoose-validator');
const channelSchema = new mongoose.Schema({
    channel_name:{
        type: String,
        trim: true,
        min: 3,
        required:true
    },
    slug:{
        type : String,
        unique : true,
        index: true,
        lowercase: true
    },
    views:{
        type: Number,
        min:1,
        required: true
    },
    spent_in_usd:{
        type: Number,
        min:1,
        required:true
    },
    date:{
        type:Date,
        default:Date.now(),
        required: false
    }
},{timestamps:true});

module.exports = mongoose.model('Channel',channelSchema);