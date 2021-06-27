
import React from 'react'

import {  gql, useQuery } from '@apollo/client'

import { useParams } from 'react-router'
import AllGuests from './AllGuests'

import { Icon, IconButton, makeStyles } from '@material-ui/core'
import { PlayCircleFilledOutlined } from '@material-ui/icons';

import Loading from './loading'

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
            {/* <IconButton className={classes.icon}>
              <Icon>
                <PlayCircleFilledOutlined/>
              </Icon>
            </IconButton> */}
        <audio key={voice._id}  controls>
           <source  src={`http://localhost:4000/audio/${voice.file}`} type="audio/wav"></source>
        </audio>
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


