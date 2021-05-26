const mongoose = require('mongoose')
const User = require('./User')

const Schema = mongoose.Schema


const RoomSchema = new Schema({


    roomID:{
        type:String,
        // required:true
    },

    roomname:{
        type:String,
        // required:true
    },

    creator:{
        type:Schema.Types.ObjectId,
        ref:User
    },

    guestList:[{
        type:Schema.Types.ObjectId,
        ref:User
    }],

    Audio:[
        {
            speaker:{
            type:Schema.Types.ObjectId,
            ref:User
            },
            file:{
            type:String,
            required:true,
            },
            speech:{
            type:String,
            require:true
            }
        }
    ]
})

module.exports = mongoose.model('Room',RoomSchema)
