const mongoose = require('mongoose')
const User = require('./User')
const Room = require('./Room')

const Schema = mongoose.Schema


const AudioSchema = new Schema({

    

    roomid:{
        type:Schema.Types.ObjectId,
        ref:Room
    },
    speaker:{
        type:Schema.Types.ObjectId,
        ref:User
    },

    audioFile:{
        type:String,
        require:true
    },

    textdata:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('Audio',AudioSchema)
