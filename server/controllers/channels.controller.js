const { default: slugify } = require('slugify');
const channel = require('../models/channels.model');
const channelService = require('../services/channels.service');



exports.create = async (req,res,next) =>{
   const {channel_name,views,spent_in_usd} = req.body;
   const slug = slugify(`${channel_name} ${Date.now('micro')}`)

   try {
       var channel = await channelService.create(channel_name,views,spent_in_usd,slug)
       return res.json(channel);
       
   } catch (error) {
       return res.status(404).json({
           message : error.message
       })
   }
}

exports.getAll = async (req,res,next) => {
    try {
        var channels = await channelService.getAll()
        return res.json(channels);
    } catch (error) {
        return res.status(404).json({
            message : error.message
        })
    }
}

exports.getChannel = async (req,res,next) => {
    try {
        const {slug} = req.params;
        var channels = await channelService.getChannel(slug)
        return res.json(channels);
    } catch (error) {
        return res.status(404).json({
            message : error.message
        })
    }
}

exports.updateChannel = async (req,res,next) =>{
    const {slug} = req.params;
    const {channel_name,views,spent_in_usd,date} = req.body;
 
    try {
        var channels = await channelService.updateChannel(channel_name,views,spent_in_usd,slug,date)
        return res.json(channels);
        
    } catch (error) {
        return res.status(404).json({
            message : error.message
        })
    }
 }


 exports.deleteChannel = async (req,res,next) => {
    try {
        const {slug} = req.params;
        var channels = await channelService.deleteChannel(slug)
        return res.json(`${channels} deleted`);
    } catch (error) {
        return res.status(404).json({
            message : error.message
        })
    }
}

exports.getChannelViews = (req,res) => {
    channel.find({})
              .sort({date:-1})
              .exec((err,channels)=>{
                  if(err) {
                      console.log(err);
                      res.status(400).json({
                          error: "could not fetch records"
                      })
                  }
                  const data = 
                  {
                    labels: [],
                    datasets: [
                      {
                        label: '',
                        data: [],
                        backgroundColor : [
                            'rgba(54, 162, 235, 0.2)',
                          ],
                          borderColor: [
                            'rgba(54, 162, 235, 1)',
                          ],
                        borderWidth: 1,
                      },
                  ],
                  };
                  channels.forEach(channel => {
                      data.labels.push(channel.channel_name);
                      data.datasets[0].data.push(channel.views);
                      data.datasets[0].label = "# of Views";
                  });
                  res.json(data)
              });
  }

  exports.getChannelSpends = (req,res) => {
    channel.find({})
              .sort({date:-1})
              .exec((err,channels)=>{
                  if(err) {
                      console.log(err);
                      res.status(400).json({
                          error: "could not fetch records"
                      })
                  }
                  const data = 
                  {
                    labels: [],
                    datasets: [
                      {
                        label: '',
                        data: [],
                        backgroundColor : [
                            'rgba(255, 99, 132, 0.2)',
                          ],
                          borderColor: [
                            'rgba(255, 99, 132, 1)',

                          ],
                        borderWidth: 1,
                      },
                  ],
                  };
                  channels.forEach(channel => {
                      data.labels.push(channel.channel_name);
                      data.datasets[0].data.push(channel.spent_in_usd);
                      data.datasets[0].label = "Amount Spent($)";
                  });
                  res.json(data)
              });
  }




