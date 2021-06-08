const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    channel_name:{
        type: String,
        trim: true,
        min: [3,"Channel name should have atleast 3 characters"],
        required:[true,"Channel name is required"],
    },
    slug:{
        type : String,
        unique : [true,"This channel name is already in use please try something else"],
        index: [true,"This channel name is already in use please try something else"],
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