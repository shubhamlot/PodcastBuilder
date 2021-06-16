
import React from 'react'
import { useState } from 'react'

import {  gql, useMutation, useQuery } from '@apollo/client'

import { Redirect, useParams } from 'react-router'
import AllGuests from './AllGuests'

import { createMuiTheme, FormHelperText, Icon, makeStyles, ThemeProvider } from '@material-ui/core'
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
    backgroundColor:"#5DB7DE",
    color:"#000000"
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
    backgroundColor:"#FF7F11",
    color:"#000000"
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
    backgroundColor:"#F08080",
    color:"#000000"
  }
});


const SHOW_FILE = gql`
 query listGuests($roomId:String){
  
    listGuests(roomId:$roomId)
  
 }
`
export default function FS(){

    const theme = createMuiTheme({
      palette:{
        type:"dark"
      }
    })

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
     <ThemeProvider theme={theme}>
       <h3>Joined Guests</h3>
        <div className={classes.container}>
        {guestList}
         </div>
     </ThemeProvider>
    )
}



