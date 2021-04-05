const mongoose = require('mongoose')
const User = require('./User')

const Schema = mongoose.Schema


const RoomSchema = new Schema({

    roomname:{
        type:String,
        required:true
    },

    creator:{
        type:Schema.Types.ObjectId,
        ref:User
    },

    guestList:[{
        type:Schema.Types.ObjectId,
        ref:User
    }]
})

module.exports = mongoose.model('Room',RoomSchema)
