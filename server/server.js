const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

//imports
const channelRoutes = require('./routes/channels.route');


// instantiate express
const app = express();

//db connect
    mongoose.connect(process.env.DB, {
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("databse  connected");
    })
    .catch(err=>console.log(err));

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api/channels',channelRoutes);


//routes



const port = process.env.PORT || 8000;
app.listen(port,"127.0.0.1",() =>{
    console.log(`server running on  ${port}`);
});