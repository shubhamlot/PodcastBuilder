
const { argsToArgsConfig } = require('graphql/type/definition')
const Room = require('../models/Room')
const User = require('../models/User')
const Audio = require('../models/Audio')

module.exports = {  
    users:()=>{
        return User.find()
        .then(users =>{
          return users.map(user => {
            return {
              ...user._doc,
              _id:user.id,
              
            }
          })
        })
      },
  
      createUser:(arg)=>{
       
         user = new User({
            username : arg.userInput.username,
            email : arg.userInput.email,
            password : arg.userInput.password,
            isGuest:arg.userInput.isGuest

        })
        user.save()
        return user
        
      },


      rooms:()=>{
        return Room.find()
        .then(rooms =>{
          return rooms.map(room => {
            return {
              ...room._doc,
              _id:room.id,
              
            }
          })
      })
    
    },

    createRoom:(arg)=>{

      room = new Room({
        roomname:arg.roomInput.roomname,
        creator:arg.roomInput.creator,
        guestList:arg.roomInput.guestList
      })

      room.save()
      return room
    },

    audios:()=>{
      return Audio.find()
        .then(audios =>{
          return audios.map(audio => {
            return {
              ...audio._doc,
              _id:audio.id,
              
            }
          })
      })
    },

    createAudio:(args)=>{
      audio = new Audio({
        roomid:args.audioInput.roomid,
        speaker:args.audioInput.speaker,
        audioFile:args.audioInput.audioFile
      })
      audio.save()
      return audio
    },
}