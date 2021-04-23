// This part is of the Room module done by shubham on 28.03.2021

const e = require('express');
const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid');
const PORT = 4000

class Room{
    constructor(id,roomName,creator){
        this.id = id
        this.roomName = roomName
        this.creator = creator
        this.date = new Date().toISOString()
        this.guestList=[]
    }

    addguest(guestid){
        this.guestList.push(guestid)
    }


}


let roomdb=[]


app.get(`/CreateRoom/roomId=:roomId&roomName=:roomName&creator=:creator`,(req,res)=>{
   let room = new Room(req.params.roomId,req.params.roomName,req.params.creator)
   roomdb.push(room)
   console.log(roomdb)
})

function check(roomid){

    var obj = null
    roomdb.forEach(element=>{
        if(element.id === roomid){
             obj = element
        }
        
    })    

 
    return obj
}


app.get(`/JoinRoom/roomId=:roomId&roomName=:roomName&guest=:guest`,(req,res)=>{
    
    let values = check(req.params.roomId)
    values.addguest(req.params.guest)
    console.log(values)
      
})


app.get(`/`,(req,res)=>{
    // res.send(`the server is running on ${PORT}`)

    let roomName = "podcast"
    res.redirect(`/CreateRoom/roomId=${uuidv4()}&roomName=${roomName}&creator=${uuidv4()}`)
})

app.listen(PORT,()=>{
    console.log("Server started")
})