
import React from 'react'
import { useState } from 'react'

import {  gql, useMutation, useQuery } from '@apollo/client'

import { Redirect, useParams } from 'react-router'
import AllGuests from './AllGuests'

import { FormHelperText, Icon, makeStyles } from '@material-ui/core'
import { Add, FaceSharp } from '@material-ui/icons'

const useStyles = makeStyles({
  container:{
    display:"flex",
    overflowY:"hidden"
  },

  avatar:{
    flex:3,
    fontSize:"20px",
    textAlign:"center",
    margin:4,
    padding:4,
    width:40,
    height:70,
    borderRadius:10,
    backgroundColor:"#fff8e1",
  },
  orangeAvatar:{
    flex:3,
    fontSize:"20px",
    textAlign:"center",
    margin:4,
    padding:4,
    width:40,
    height:70,
    borderRadius:10,
    backgroundColor:"#ffe082"
  },
  purpleAvatar:{
    flex:3,
    fontSize:"20px",
    textAlign:"center",
    margin:4,
    padding:4,
    width:40,
    height:70,
    borderRadius:10,
    backgroundColor:"#f8bbd0"
  }
});


const SHOW_FILE = gql`
 query listGuests($roomId:String){
  
    listGuests(roomId:$roomId)
  
 }
`
export default function FS(){
    const classes = useStyles();
    const { room } = useParams()
    
    const{ loading,error,data} = useQuery(SHOW_FILE,{
      variables: {roomId:room},
      pollInterval:500,
    })
 
    if (loading) return null

     
    let guestList = []
   
    let classNameHolder = [classes.avatar,classes.orangeAvatar,classes.purpleAvatar]
    if(data){
      data.listGuests.map(guest=>{
        guestList.push(
        <div key={guest} className={classNameHolder[Math.floor(Math.random()*3)]} >
        <Icon>
          <FaceSharp/>
        </Icon>
        <br></br>
        <AllGuests params={guest}/><br></br>
        </div>)
      })
    }
    

    return(
     <div>
       <h3>Joined Guests</h3>
        <div className={classes.container}>
        {guestList}
         </div>
     </div>
    )
}



