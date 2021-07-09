const mongoose = require('mongoose')
const User = require('./User')
const Episode = require('./Episode')

const Schema = mongoose.Schema


const ChannelSchema = new Schema({

   channelName:{
       type:String,
       require:true
   },
   discription:{
       type:String,
   },
   profileImage:{
       type:String
   },
   language:{
       type:String,
   },
   country:{
       type:String
   },
   contenttype:{
       type:String
   },
   RSSLink:{
    type:String
   },
   creatorID:{
    type:Schema.Types.ObjectId,
    ref:User,
    required:true
   },

   episodesList:[{
    type:Schema.Types.ObjectId,
    ref:Episode,
    required:true
   }]
  
})

module.exports = mongoose.model('Channel',ChannelSchema)