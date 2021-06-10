const channel = require('../models/channels.model');


exports.create = async  (channel_name,views,spent_in_usd,slug)=>{
    try {
       var  channels = await channel.create({channel_name,views,spent_in_usd,slug});
        return channels;
        
    } catch (e) {

        throw Error('Error while Creating Channel')

    }
}

exports.getAll = async () => {
    try {
        var channels = await channel.find({}).sort({date:-1}).exec();
        return channels
    } catch (error) {
        
        throw Error("Error while fetching Channels")
    }
}

exports.getChannel = async (slug) => {
    try {
        var channels = await channel.findOne({slug}).exec();
        return channels
    } catch (error) {
        
        throw Error("Error while fetching Channel")
    }
} 

exports.updateChannel = async(channel_name,views,spent_in_usd,slug,date) =>{
    try {
        var channels = await  channel.findOneAndUpdate({slug},{channel_name,views,spent_in_usd,date},{new:true}).exec();
        return channels
    } catch (error) {
        
        throw Error("Error while updating Channel")
    }
}

exports.deleteChannel = async (slug) => {
    try {
        var channels = await channel.findOneAndDelete({slug}).exec();
        return slug
    } catch (error) {
        
        throw Error("Error while fetching Channel")
    }
} 