import { ReactMic } from 'react-mic';
import React, { useContext, useEffect, useState } from 'react' 
import {AudioProcess} from './AudioProcess'
import {gql, useMutation} from '@apollo/client';
import {Button, Container, Grid, Icon, IconButton, ThemeProvider} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useParams } from 'react-router';
import AuthContext from '../context/auth-context'
import { Link } from 'react-router-dom';
import {saveAs} from 'file-saver'
import { Done, KeyboardArrowLeft, KeyboardArrowRight, Mic, PlayArrow, Stop } from '@material-ui/icons';
import Recorder from 'recorder-js';
import Gif from './Gif'
// var toWav = require('audiobuffer-to-wav')
// const UPLOAD_FILE = gql`
//   mutation UploadFile($file:Upload!,$roomid:String,$speaker:String){
//       UploadFile(file:$file,roomid:$roomid,speaker:$speaker)
//   }
// `


const useStyles = makeStyles((theme)=>({
  buttonroot:{
    display:'flex',
    width:'100%',
  },
  startbutton:{
    flex:1,
    color:'blue'
  },
  stopbutton:{
    flex:1,
    color:"red"
  },
  donebutton:{
   
    textDecoration:'none'
  },
  
  container:{
    padding:10
  },
  control:{
    margin:10,
    display:"flex"
  },
  icon:{
    // flex:1,
  
    backgroundColor:"#FFFFFF",
    textAlign:"center",
    color:"#000000",
    '&:hover':{
      color:"red"
    }
  },

  iconClick:{
    color:"red",
    backgroundColor:"#424242"
  },
  iconmic:{
    // flex:1,
    textAlign:"center",
    color:"#ff4848",
    
  },
  gif:{
    flex:1,
    justifyItems:"contain",
    margin:14
  },
  iconnext:{
    color:"lightgreen"
  }

}))




const UPLOAD_FILE = gql`
  mutation UploadFile($file:Upload!,$roomid:String,$speaker:String){
      UploadFile(file:$file,roomid:$roomid,speaker:$speaker)
  }
`

export default function Test(){
    const classes = useStyles();
    const auth = useContext(AuthContext)
    const audioContext =  new (window.AudioContext || window.webkitAudioContext)();
    const recorder = new Recorder(audioContext, {
        // An array of 255 Numbers
        // You can use this to visualize the audio stream
        // If you use react, check out react-wave-stream
        // onAnalysed: data => console.log(data),
      });
        const { room } = useParams()

      
      const [recording,setRecording] = useState(false)
      const [file,setFile] = useState(null)

          const[uploadFile] = useMutation(UPLOAD_FILE,{
        onCompleted: data => console.log(data),
      })

  navigator.mediaDevices.getUserMedia({audio: true})
  .then(stream => recorder.init(stream))
  .catch(err => console.log('Uh oh... unable to get stream...', err));


  const startRecording=()=>{
      
    recorder.start()
      .then(() => setRecording(true));
      console.log("start")
  }

  const stopRecording=()=>{
    console.log("stop")
    recorder.stop()
      .then(({blob, buffer}) => {
        setRecording(false)
        setFile(blob);
        
      });
      if(file != null){
        let speaker = auth.userId
        uploadFile({variables:{file:file,roomid:room,speaker:speaker}})
      }
      
  }
 
  

  if(!recording){

  return(
             

        <div className={classes.container}>
          <div className={classes.control}>
          <div className={classes.gif}>
            {/* <Gif/> */}
          </div>
           
           
            <IconButton
            className={ classes.icon} 
            onClick={ startRecording }>
            
                <Mic/>
             
            </IconButton>
            {/* <Button 
            className={ classes.iconmic
            } 
            onClick={ stopRecording }>
             
                
             
            </Button> */}
            <IconButton className={classes.iconnext}>
            {/* <Link className={classes.donebutton} to={`roomID=${room}/editpodcast`}> */}
           
              <KeyboardArrowRight/>
            
            {/* </Link> */}
          </IconButton>
            

          </div>
        </div>
  )
          }

          else{
      return(                   

        <div className={classes.container}>
        <div className={classes.control}>
        <div className={classes.gif}>
          <Gif/>
        </div>
         
         
          <IconButton
          className={ classes.iconClick} 
          onClick={ stopRecording }>
          
              <Mic/>
           
          </IconButton>
          {/* <Button 
          className={ classes.iconmic
          } 
          onClick={ stopRecording }>
           
              
           
          </Button> */}
          <IconButton className={classes.iconnext} disabled>
            {/* <Link className={classes.donebutton} to={`roomID=${room}/editpodcast`}> */}
           
              <KeyboardArrowRight/>
            
            {/* </Link> */}
          </IconButton>
          

        </div>
      </div>
)
          }
}