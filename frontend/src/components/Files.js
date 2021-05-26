
import React, { useEffect } from 'react'
import { useState } from 'react'

import {  gql, useLazyQuery, useQuery } from '@apollo/client'
import Username from './Username'
import { useParams } from 'react-router'
import AllGuests from '../componets2/AllGuests'
import { ValidationContext } from 'graphql'
import { FormHelperText, makeStyles } from '@material-ui/core'

const SHOW_FILE = gql`
  query file ($roomid:String){
      files(roomid:$roomid){
        _id
        speaker
        file
        speech
      }
  }
`

// a887d8ae-3c6b-413f-a7fc-0ae0c8311dbe

const useStyles = makeStyles((theme) => ({
      box:{
        display:'block'
      },
      tab:{
       
        listStyleType:"none",
        borderRadius:"10px",
        border:"1px solid",
        margin:20,
        fontWeight:"bold",
        fontSize:"20px"
      },
      tabhead:{
      paddingLeft:"40px",
      paddingTop:"10px",
     
      },
      speech:{
        fontSize:"18px",
        fontWeight:"100",
      },

}))
export default function FS(){

  

    const classes = useStyles();
    

    const { room } = useParams()
    
    const{ loading,err,data} = useQuery(SHOW_FILE,{
      variables: {roomid:room},
      pollInterval: 500,
    })
   
    if(loading) return <p>loading</p>
   
    

    let audio = []
 
      if(data === undefined || err ){
        audio = []
      }
      
      else{
    data.files.map((voice)=>{
        console.log(voice)
        audio.push(
        <li key={voice._id} className={classes.tab} >
          <div className={classes.tabhead}>
          <AllGuests params={voice.speaker}/>
          <p className={classes.speech}>{voice.speech}</p>
          </div>
          
        <audio key={voice._id}  controls>
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


