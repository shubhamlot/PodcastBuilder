const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose');
const Room = require('./models/Room');
const Channel = require('./models/Channel');
const jwt = require('jsonwebtoken')
const {  v4 : uuidv4 } = require("uuid");
const User = require('./models/User');
const Episode = require('./models/Episode')
const bcrypt = require('bcrypt');
const { findOne } = require('./models/User');
const isAuth = require('./middleware/is-auth')
const {dataConvertion,combineFiles} = require('./pythonBridge/files')
// const defaultimage = require('./public/images/default.jpg')
// const crunker = require('crunker')
// const ffmpeg = require('fluent-ffmpeg')
// const ffmpeg = require('@ffmpeg-installer/ffmpeg').path;

const Feed = require("feed").Feed;

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



function createFeed(channel,episodeslist){


const feed = new Feed({
  title:channel.channelName ,
  description: channel.discription,
  language: channel.language, // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  image: `http://localhost:4000/images/${channel.profileImage}`,
  updated: new Date(), // optional, default = today
  generator: "Podcast Builder", // optional, default = 'Feed for Node.js'
  contenttype:channel.contenttype,
    
  
  
});

if(episodeslist[0]!=undefined){
episodeslist.forEach(epi=>{
  feed.addItem({
  title:epi.EpisodeName,
  image:`http://localhost:4000/images/${epi.profileImage}`,
  link:`http://localhost:4000/pythonAudio/${epi.EpisodeName}`,
  description:epi.discription
})
})
}

const pathName = path.join(__dirname,`/public/RSS/${channel.channelName}.rss`)
fs.writeFile(pathName,feed.rss2(),(err)=>{
  console.log(err)
})

Channel.updateOne({_id:channel._id},{RSSLink:`http://localhost:4000/RSS/${channel.channelName}.rss`}).then(res=>{
  console.log(res)
})




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
    token:String
    tokenExpiration:String
    isGuest:Boolean
  }

  type Room{
    roomID:String
    roomname:String
    creator:String
    guestList:[String]
  }

  type Channel{
    channelName:String
    profileImage:String
    discription:String
    language:String
    country:String
    contenttype:String
    creator:String
    rss:String
  }

  type Episode {
    EpisodeName:String
    discription:String
    audioFile:String
    img:String
  }

  type Query {
    files(roomid:String): [File!]
    finduser(id:String): String
    findRoom(id:String):Room
    login(email:String,password:String):User
    listGuests(roomId:String):[String]
    showChannel(userId:String):Channel
    reviewEpisode(EpisodeID:String):Episode
    displayEpisode(userId:String):[String]
    channelInfo(userId:String):Channel
  }

  type Mutation {
    UploadFile(file: Upload!,roomid:String,speaker:String): String!
    createRoom(roomname:String,creator:String):Room!
    Signup(username:String,password:String,email:String,isGuest:Boolean):String
    addToRoom(guestid:String,roomid:String):String
    CombineFiles(list:[String]):String
    CreateChannel(file:Upload!,channelname:String,discription:String,country:String,language:String,contenttype:String,creator:String): String!
    CreateEpisodes(userId:String!,EpisodeName:String!,discription:String!,profileImage:Upload!,audioFile:String!):String
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
          
            return data.username
          
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
         const token = jwt.sign({ userId : user.id, email: user.email }, 'secretkey!@#', {
        expiresIn: '1h'
      })
         console.log(user)
         return {
           _id:user._id,
           isGuest:user.isGuest,
           token:token,
           tokenExpiration:1

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
      },

      showChannel:async(parent,arg)=>{
        // console.log(arg)
        return Channel.findOne({creatorID:arg.userId}).then(data=>{
          if(data){
            console.log(data.profileImage)
            return {channelName:data.channelName,
                    profileImage:data.profileImage}
          }
        })
      },

      reviewEpisode:async(parent,{EpisodeID})=>{
        return Episode.findOne({_id:EpisodeID}).then(res=>{
          return{
            EpisodeName:res.EpisodeName,
            discription:res.discription,
            audioFile:res.audiofile,
            img:res.profileImage
          }
        })
      },
       displayEpisode:async(parent,{userId})=>{

          return await Channel.findOne({creatorID:userId}).then(async res=>{
            return await res.episodesList
          }).then(async list=>{
             return list
                
              })
              
            
       },

       channelInfo:async(parent,{userId})=>{
        return await Channel.findOne({creatorID:userId}).then(async res=>{
          return {
            channelName:res.channelName,
            discription:res.discription,
            profileImage:res.profileImage,
            language:res.language,
            country:res.country,
            contenttype:res.contenttype,
            creator:res.creatorID,
            rss:res.RSSLink
          }
        })
       }
  },
  
  Mutation: {
    UploadFile: async (parent, {file , roomid ,speaker}) => {
       const { createReadStream, filename, mimetype, encoding } = await file
      
     
    //  const {ext,name} = path.parse(filename)
     const randomName = generateRandomString(12)+".wav"
        const stream = createReadStream()
      console.log(filename)
        const pathName = path.join(__dirname, `/public/audio/${randomName}`)
        await stream.pipe(fs.createWriteStream(pathName))
     
    // //     console.log(pathName)
    // //     // return {
    // //     //     url:`http://localhost:4000/Audio/${randomName}`,
    // //     // }
        
    // //   //  console.log(arg)
      let speech = await dataConvertion(randomName)
       Room.updateOne({ roomID: roomid },{ $push: { Audio: [{speaker:speaker,file:randomName,speech:speech}] }}).then(
         room=>{
           console.log(room)
         }
       )
      
         
          return `http://localhost:4000/audio/${randomName}`
        

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
      console.log("in")
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
              isGuest:args.isGuest
            })
            console.log(newuser)
            newuser.save()
            return "saved"
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

    CombineFiles:async(parent,{list})=>{
      
      let temp =[]
      list.forEach(item=>{
       
        temp.push(item)
      })
      
      let final = await combineFiles(temp)
      return final
   
  },

  CreateChannel:async(parent,{file,channelname,discription,language,country,contenttype,creator})=>{
    
     User.findOne({_id:creator}).then(res=>{
        if(res){
          User.updateOne({_id:creator},{isGuest:false}).then(res=>{
            console.log(res)
          })
        }
     })

    return Channel.findOne({channelName:channelname})
    .then(data=>{
      if(data){
        return new Error("channle name alredy taken")
      }
    }).then(res=>{
        return Channel.findOne({creator:creator}).then(data=>{
          if(data){
            return new Error("user already have a channel")
          }
        })
    }).then(async ()=>{
      if(file !== "none"){
      const { createReadStream, filename, mimetype } = await file
       const {ext,name} = path.parse(filename)
       const randomName = generateRandomString(12)+ext
       const stream = createReadStream()
       const pathName = path.join(__dirname,`/public/images/${randomName}`)
       await stream.pipe(fs.createWriteStream(pathName))
       return randomName
      }
      else{
        return "default.jpg"
      }
    })
    .then((filename)=>{
      const newChannel = new Channel({
        channelName:channelname,
        discription:discription,
        profileImage:filename,
        language:language,
        contenttype:contenttype,
        creatorID:creator
      })
      newChannel.save()
      // console.log(newChannel)
      return newChannel
    }).then(res=>{
      
      createFeed(res,null)
      return "saved successfully"
    })
    
  },


  CreateEpisodes:async(parent,{userId,EpisodeName,discription,profileImage,audioFile})=>{

       const { createReadStream, filename, mimetype } = await profileImage
       const {ext,name} = path.parse(filename)
       const randomName = generateRandomString(12)
       const stream = createReadStream()
       const pathName = path.join(__dirname,`/public/images/${randomName}`)
       await stream.pipe(fs.createWriteStream(pathName))
      

      const newEpisode = new Episode({
          EpisodeName:EpisodeName,
          discription:discription,
          audiofile:audioFile,
          profileImage:randomName
        })


     

       
        return newEpisode.save().then(data=>{
          return Channel.updateOne({creatorID:userId},{$push:{episodesList:data._id}}).then(res=>{
            console.log(res)
            return data
          }).then(episode=>{
             Channel.findOne({creatorID:userId}).then(channel=>{
              
              return channel
             }).then(list=>{
              let temp=[]
             
              list.episodesList.forEach(res=>{
                Episode.findOne({_id:res}).then(d=>{
                  temp.push(d)
                  return temp
                }).then(f=>{
                  createFeed(list,f)
                })
              })
              
             })
             
             // console.log(res)
             return episode._id
          })
        })
       

     

  }

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

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  if(req.method == "OPTIONS"){
    return res.sendStatus(200)
  }
  next()
})

app.use(isAuth);
mongoose.connect('mongodb://localhost/PodcastBuilderdb',{useNewUrlParser: true,useUnifiedTopology: true})
.then(
  app.listen({ port:4000 },()=>{
    console.log("server on 4000")
},)
)

