const { default: slugify } = require('slugify');
const channel = require('../modules/channels');



exports.create = (req,res) =>{
   const {channel_name,views,spent_in_usd} = req.body;
   const slug = slugify(`${channel_name} ${Date.now('micro')}`)

   channel.create({channel_name,views,spent_in_usd,slug},(err,channel) =>{
    if(err){
        console.log(err);
        res.status(400).json({
            error: "error occured",
            message : err.message
        });
    }
    res.json(channel);
   })
}

exports.getAll = (req,res) => {
  channel.find({})
            .sort({created_at:-1})
            .exec((err,channels)=>{
                if(err) {
                    console.log(err);
                    res.status(400).json({
                        error: "could not fetch records"
                    })
                }
                res.json(channels)
            });
}
exports.getChannel = (req,res) => {
    const {slug} = req.params;
   channel.findOne({slug})
            .exec((err,channel) =>{
                if(err) {
                    console.log(err);
                    res.status(400).json({
                        error: `could not fetch record ${slug} `
                    })
                }
                res.json(channel) 
            });
}
exports.updateChannel = (req,res) => {
    const {slug} = req.params;
    const {channel_name,views,spent_in_usd,date} = req.body;

    channel.findOneAndUpdate({slug},{channel_name,views,spent_in_usd,date},{new:true})
            .exec((err,channel)=>{
                if(err) {
                    console.log(err);
                    res.status(400).json({
                        error: "could not update record"
                    });
                }
                res.json(channel) 
            });
}
exports.deleteChannel = (req,res) => {
    const {slug} = req.params;
    channel.findOneAndDelete({slug})
            .exec((err,channel) => {
                if(err) {
                    console.log(err);
                    res.status(400).json({
                        error: "could not update record"
                    });
                }
                res.json({
                    message:`${slug} deleted`
                }) 
            })
}


