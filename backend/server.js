const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose');
const Room = require('./models/Room');
const {  v4 : uuidv4 } = require("uuid");
const User = require('./models/User');
const bcrypt = require('bcrypt')


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
    isGuest:Boolean
  }

  type Room{
    roomID:String
    roomname:String
    creator:String
  }

  type Query {
    files(roomid:String): [File!]
    finduser(id:String): User
    findRoom(id:String):Room
    login(username:String,password:String):User
    listGuests(roomId:String):[String]
  }

  type Mutation {
    UploadFile(file: Upload!,roomid:String,speaker:String): String!
    createRoom(roomname:String,creator:String):Room!
    addUser(username:String,password:String,email:String):User
    addToRoom(guestid:String,roomid:String):String
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
       
         return await User.findOne({_id:arg.id}).then(async data=>{
          
            return{
            _id:data._id,
            username:data.username,
            email:data.email,
            isGuest:data.isGuest
           }
          
         })
    
        
      },
      findRoom:(parent,{id})=>{
        
        return Room.findOne({roomID:id}).then(room=>{
         
          if(room != null){
          return room
          }else{
            return new Error("no room found")
          }
        })
      },
      login:(parent,arg)=>{
       
       return User.findOne({username:arg.username})
        .then(user=>{
         const isEqual =  bcrypt.compare(arg.password,user.password)
         if(!isEqual){
           return new Error("auth failed")
         }
         return user
        })
      },

      listGuests:(parent,arg)=>{
         return Room.findOne({roomID:arg.roomId}).then(room=>{
           if(room === null){
             return []
           }
           else{
             return room.guestList
           }
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

        return {
          roomID:room.roomID,
          roomname:room.roomname,
          creator:room.creator
        }
        
      },
      addUser:async (parent,args)=>{
        // console.log(args)
        return User.findOne({email:args.email,username:args.username})
        .then(user=>{
          if(user){
            console.log("user already exists")
            return new Error("user already exists")
          }
          return bcrypt.hash(args.password,12)
        }).then(hashedpassword=>{
          const user = new User({
            username:args.username,
            email:args.email,
            password:hashedpassword,
            isGuest:true
          })
          
          return user.save()
        })
       
      },

      addToRoom:(parent,{roomid,guestid})=>{
      
      return Room.findOne({roomID:roomid}).then(room=>{
          if(!room){
              return new Error("no room found")
          }
          return room.guestList
      }).then(guest=>{
       
        if(guest.includes(guestid)){
          return guest
        }
        else{
           Room.updateOne({ roomID: roomid },{ $push: { guestList: [guestid] }}).then(res=>{
             console.log()
           })
           return "done"
        }
      })

    
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


mongoose.connect('mongodb://localhost/PodcastBuilderdb',{useNewUrlParser: true})
.then(
  app.listen({ port:4000 },()=>{
    console.log("server on 4000")
})
)
