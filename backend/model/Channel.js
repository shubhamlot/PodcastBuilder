const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChannelSchema = new Schema({
    channelname:{
        type:String,
        require:true
    },
    contenttype:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    },
    discription:{
        type:String,
        require:true
    },
    rsslink:{
        type:String,
        require:true
    },
    coverimage:{
        type:String,
        require:true
    }

})

module.exports = mongoose.model('Channel',ChannelSchema)