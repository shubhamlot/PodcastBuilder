const mongoose = require('mongoose')



const Schema = mongoose.Schema


const EpisodeSchema = new Schema({

   EpisodeName:{
       type:String,
       require:true
   },
   discription:{
       type:String,
   },
   profileImage:{
       type:String
    },
  audiofile:{
      type:String
  },
  textFile:{
      type:String
  }
})

module.exports = mongoose.model('Episode',EpisodeSchema)