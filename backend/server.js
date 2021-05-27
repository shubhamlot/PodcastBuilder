const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose');
const Room = require('./models/Room');
const {  v4 : uuidv4 } = require("uuid");
const User = require('./models/User');
const bcrypt = require('bcrypt');
const { findOne } = require('./models/User');


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
   speech:String
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
    login(email:String,password:String):User
    listGuests(roomId:String):[String]
  }

  type Mutation {
    UploadFile(file: Upload!,roomid:String,speaker:String): String!
    createRoom(roomname:String,creator:String):Room!
    Signup(username:String,password:String,email:String):User
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
      
       return User.findOne({email:arg.email})
        .then(user=>{
         const isEqual =  bcrypt.compare(arg.password,user.password)
         if(!isEqual){
           return new Error("auth failed")
         }
         console.log(user)
         return {
           _id:user._id,
           username:user.username,
           email:user.email,
           isGuest:user.isGuest
         }
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
     const randomName = generateRandomString(12)+".wav"
        const stream = createReadStream()
        const pathName = path.join(__dirname, `/public/Audio/${randomName}`)
        await stream.pipe(fs.createWriteStream(pathName))
     
        
        // return {
        //     url:`http://localhost:4000/Audio/${randomName}`,
        // }
        
      //  console.log(arg)
      let speech = "this is test file"
       Room.updateOne({ roomID: roomid },{ $push: { Audio: [{speaker:speaker,file:randomName,speech:speech}] }}).then(
         room=>{
           console.log(room)
         }
       )
      
         
          return `http://localhost:4000/Audio/${randomName}`
        

      //   // })

       
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
      Signup:async (parent,args)=>{
      
        return User.findOne({email:args.email,username:args.username})
        .then(user=>{
          if(user){
            return new Error("user already exists")
          }
          return hashedpassword=bcrypt.hash(args.password,12)})
          .then((hashedpassword)=>{
            const newuser = new User({
              username:args.username,
              email:args.email,
              password:hashedpassword,
              isGuest:true
            })
            console.log(newuser)
            return newuser.save()
          })
          
          
        // })
       
      },

      addToRoom:async(parent,{roomid,guestid})=>{
        
       return await  Room.findOne({roomID:roomid}).then(res=>{
          
          return res.guestList
        }).then(guestlist=>{
          
          if(guestlist.includes(guestid)){
            return new Error("already present")
          }
          else{
            Room.updateOne({roomID:roomid},{$push:{guestList:guestid}}).then(res=>{
              console.log(res)
              
            })
            return "done"
          }
        })
        
    },
   
  }
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
