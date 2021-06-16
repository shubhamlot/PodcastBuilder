
import React, { useEffect } from 'react'
import { useState } from 'react'

import {  gql, useLazyQuery, useQuery } from '@apollo/client'
import Username from './Username'
import { useParams } from 'react-router'
import AllGuests from '../componets2/AllGuests'
import { ValidationContext } from 'graphql'
import { FormHelperText, Icon, IconButton, makeStyles } from '@material-ui/core'
import { PlayCircleFilledOutlined } from '@material-ui/icons';
import ReactAudioPlayer from 'react-audio-player';
import Loading from '../componets2/loading'

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
        backgroundColor:"#D6D5B3",
        margin:20,
        fontWeight:"bold",
        fontSize:"20px"
      },
      tabhead:{
      paddingLeft:"40px",
      paddingTop:"10px",
      color:"#000000",
      flex:1
      },
      speech:{
        fontSize:"18px",
        fontWeight:"100",
      },
      container:{
        display:"flex"
      },
      icon:{
        color:"#000000"
      }

}))
export default function FS(){

  
    
    const classes = useStyles();
    const [src,setSrc] = useState(null)

    const { room } = useParams()
    
    const{ loading,err,data} = useQuery(SHOW_FILE,{
      variables: {roomid:room},
      pollInterval: 500,
    })
   
    if(loading) return <Loading/>
   
   

    let audio = []
 
      if(data === undefined || err || data === null){
        audio = []
      }
      
      else{
    data.files.map((voice)=>{
        
        audio.push(
        <li key={voice._id} className={classes.tab} >
          <div className={classes.container}>
          <div className={classes.tabhead}>
          <AllGuests params={voice.speaker}/>
          <p className={classes.speech}>{voice.speech}</p>
          </div>
          <div>
            <IconButton className={classes.icon}>
              <Icon>
                <PlayCircleFilledOutlined/>
              </Icon>
            </IconButton>
        {/* <audio key={voice._id}  controls>
           <source  src={`http://localhost:4000/Audio/${voice.file}`} type="audio/wav"></source>
        </audio> */}
        </div>
        </div>
        </li>
        )
        }
       
    )
      }
    




if(data.files[0] === undefined){
  console.log(data)
  return(<h1>lets start.... </h1>)
}

else{
 
    return(
     
      <div className={classes.box}>
        <ul>
        {audio}
        </ul>

      
      </div>
    )
}
    
}


