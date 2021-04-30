
import React from 'react'
import { useState } from 'react'

import {  gql, useQuery } from '@apollo/client'
import Username from './Username'
import { useParams } from 'react-router'
import AllGuests from './AllGuests'
import { ValidationContext } from 'graphql'
import { FormHelperText, makeStyles } from '@material-ui/core'

const SHOW_FILE = gql`
  query file ($roomid:String){
      files(roomid:$roomid){
        _id
        speaker
        file
      }
  }
`

// a887d8ae-3c6b-413f-a7fc-0ae0c8311dbe

const useStyles = makeStyles((theme) => ({
      box:{
        display:'block'
      },
      tab:{
        backgroundColor:"#eeeeee",
        listStyleType:"none",
        borderRadius:"10px",
        
        margin:20,
        fontWeight:"bold",
        fontSize:"20px"
      },
      tabhead:{
      paddingLeft:"40px"
      }
}))
export default function FS(){

    const classes = useStyles();
    

    const { room } = useParams()
    
    const{ loading,error,data} = useQuery(SHOW_FILE,{
      variables: {roomid:room}
    })
   
    
   
    if (loading) return null

     
    let audio = []
 
    if(data.files){
    data.files.map((voice)=>{

        audio.push(
        <li key={voice._id} className={classes.tab} >
          <div className={classes.tabhead}>
          <AllGuests params={voice.speaker}/>
          </div>
        <audio key={voice._id} controls>
           <source  src={`http://localhost:4000/Audio/${voice.file}`} type="audio/mpeg"></source>
        </audio>
        </li>
        )
        }
       
    )
      }
    

    return(
      <div className={classes.box}>
        <ul>
        {audio}
        </ul>
      </div>
    )
}

