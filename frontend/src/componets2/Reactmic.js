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
    display:"flex"
  },
  icon:{
    // flex:1,
    textAlign:"center",
    color:"#000000"
  },
  iconmic:{
    // flex:1,
    textAlign:"center",
    color:"red"
  },
  gif:{
    flex:1,
    justifyItems:"contain"
  }

}))


// export default function Reactmic(props){


//   const auth = useContext(AuthContext)
//   const audioContext =  new (window.AudioContext || window.webkitAudioContext)();
//   const recorder = new Recorder(audioContext, {
//       // An array of 255 Numbers
//       // You can use this to visualize the audio stream
//       // If you use react, check out react-wave-stream
//       // onAnalysed: data => console.log(data),
//     });

  

//   const classes = useStyles();
  
//     const [state,setState] = useState({
//         recording:false,
        
//     })

//     const [file,getFile] = useState(null)

//     const[uploadFile] = useMutation(UPLOAD_FILE,{
//         onCompleted: data => console.log(data),
//       })
 
  
  
//   const { room } = useParams()

//   navigator.mediaDevices.getUserMedia({audio: true})
//   .then(stream => recorder.init(stream))
//   .catch(err => console.log('Uh oh... unable to get stream...', err));
  
//   const onStart=()=>{
   
//     recorder.start()
//     .then(() => {setState({recording:true})
//     console.log("start")});
    
//   }
//   const onStop=()=> {

//     if(state.recording){
//     recorder.stop()
//     .then(({blob, buffer}) => {
//       setState({recording:false});
//       console.log(blob)
//       getFile(blob)
      
//     });
//  // if(file ===null || roomid === null || speaker === null) console.log(state.recording)
//  let speaker=auth.userId
//  if(!auth.userId) speaker=""
//    uploadFile({variables:{file:file,roomid:room,speaker:speaker}})
    
//   }
   
  
//   }
 

//     return (
      
        
//         // <div>
       
//         // {/* <button onClick={startRecording} type="button">Start</button>
//         // <button onClick={stopRecording} type="button">Stop</button> */}
//         // <div className={classes.buttonroot}>
//         // <Button className={classes.startbutton} onClick={startRecording}>Start</Button>
//         // <Button className={classes.stopbutton} onClick={stopRecording}>Stop</Button>
//         // <Button className={classes.donebutton} >
//         // <Link className={classes.donebutton} to={`roomID=${room}/editpodcast`} >Done</Link>
//         // </Button>
//         // </div>
//         // </div>

//         <div className={classes.container}>
//           <div className={classes.control}>
//           <div className={classes.gif}>
//           {/* <ReactMic
//           width="250"
//           height="50"
//           visualSetting="frequencyBars"
//           record={state.recording}
//           onStop={onStop}
//           strokeColor="#ffffff"
//           backgroundColor="#1976d2"
//           bitRate={256000}     
//           sampleRate={96000}
//           timeSlice={3000} 
//           minetype="audio/wav"
//           /> */}
//           </div>
           
//             <Button 
//             className={ classes.icon
//             } 
//             onClick={ onStart}>
             
//                 <Mic/>
             
//             </Button>
//             <Button 
//             className={ classes.iconmic
//             } 
//             onClick={onStop}>
             
//                 <Mic/>
             
//             </Button>
//             <Button className={classes.icon}>
//               <Link className={classes.donebutton} to={`roomID=${room}/editpodcast`}>
             
//                 <Done/>
              
//               </Link>
//             </Button>
            

//           </div>
//         </div>

      
//     )
  
// }









// import { useState } from 'react';
// import Recorder from 'recorder-js';



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
    recorder.stop()
      .then(({blob, buffer}) => {
        
        setFile(blob);
        console.log(blob)
        
      });
      if(file != null){
        let speaker = auth.userId
        uploadFile({variables:{file:file,roomid:room,speaker:speaker}})
      }
      
  }
 


  return(
             

        <div className={classes.container}>
          <div className={classes.control}>
          <div className={classes.gif}>
         
          </div>
           
            <Button 
            className={ classes.icon
            } 
            onClick={ startRecording }>
             
                Record
             
            </Button>
            <Button 
            className={ classes.iconmic
            } 
            onClick={ stopRecording }>
             
                Stop
             
            </Button>
            <Button className={classes.icon}>
              <Link className={classes.donebutton} to={`roomID=${room}/editpodcast`}>
             
                <KeyboardArrowRight/>
              
              </Link>
            </Button>
            

          </div>
        </div>
  )
}