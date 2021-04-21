const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose');
const Room = require('./models/Room');
const {  v4 : uuidv4 } = require("uuid");
const User = require('./models/User');

function generateRandomString(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}


const typeDefs = gql`
  type File {
    _id:ID
   speaker:String
   file:String
  }

  type User {
    _id:ID
    username:String
    email:String
    isGuest:String
  }

  type Query {
    files(roomid:String): [File!]
    finduser(ids:[String]): [User]
  }

  type Mutation {
    UploadFile(file: Upload!,roomid:String,speaker:String): File!
    createRoom(roomname:String,creator:String):String!
  }
`;

const resolvers = {
  Query: {
    files: async  (parent,{ roomid }) =>{
  
      //  return await Room.find({roomID:roomid}).then(async room=>{
      //     return await room.map(async value=>{
      //      return await value.Audio.map(async content=>{
      //         return await {
      //           _id:content.id,
      //           speaker:content.speaker,
      //           file:content.file
      //         }
      //       })
      //     })
      //   })
      // console.log(roomid)
    //  Room.find({roomID:roomid},function (err,doc){
    //     var audiomap = []
    //     return doc.map(function(data){
    //       return data.Audio.map((audio,index)=>{
    //         audiomap[index]=audio
    //       })
        
    //     })
       
    //   })

     return Room.find({roomID:roomid}).then(doc=>{
       let audiomap
       doc.map(audio=>{
           audiomap=audio.Audio
           
       })

       
       return audiomap
    })
      
      },


      finduser:async(parent,arg)=>{

        //  console.log(arg)
         return await arg.ids.map(async id=>{
       
         return await User.findOne({_id:id}).then(async data=>{
          
            return{
            _id:data._id,
            username:data.username,
            email:data.email,
            isGuest:data.isGuest
           }
          
         })
        
       })
       
        
      }
  },
  
  Mutation: {
    UploadFile: async (parent, {file , roomid ,speaker}) => {
     const { createReadStream, filename, mimetype, encoding } = await file
     const {ext,name} = path.parse(filename)
     const randomName = generateRandomString(12)+ext
        const stream = createReadStream()
        const pathName = path.join(__dirname, `/public/Audio/${randomName}`)
        await stream.pipe(fs.createWriteStream(pathName))
     
        
        // return {
        //     url:`http://localhost:4000/Audio/${randomName}`,
        // }
        
      //  console.log(arg)
      
       Room.updateOne({ roomID: roomid },{ $push: { Audio: [{speaker:speaker,file:randomName}] }}).then(
         room=>{
           console.log(room)
         }
       )
      
         
          return `http://localhost:4000/Audio/${randomName}`
        

        // })

       
      },

      createRoom:(parent,args)=>{

        const room = new Room({
           roomID:uuidv4(),
           roomname:args.roomname,
           creator:args.creator,
        })

        room.save()

        return room.roomID
        
      }
    },
  }

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express()
server.applyMiddleware({app})
app.use(express.static('public'))
app.use(cors())


mongoose.connect('mongodb://localhost/PodcastBuilderdb')
.then(
  app.listen({ port:4000 },()=>{
    console.log("server on 4000")
})
)
