const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express()


const port = 3000


let UserList = []

class Room {
    
    constructor(roomid,roomName,guests){
        this.roomid = roomid
        this.roomName = roomName
        this.guests=[]
        this.guests.push(guests)

    }

}

class User {
    constructor(username){
        this.username = username
    }
}

// app.get(`/`,(req,res)=>{
//     res.redirect(`/username=Raj&${uuidv4()}`)
// })



app.get(`/username=:username&:room&roomname=:roomname`,(req,res)=>{
    
    let user = new User(req.params.username)
    if(UserList.find(roomid)=== roomid){
      
    }
    else{
    let room = new Room(req.params.room,req.params.roomname,user)
    }
    // console.log("user join")


   
    UserList.push(room)
    console.log(UserList)
})

app.listen(port)