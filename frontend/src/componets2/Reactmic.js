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
import { Done, Mic, PlayArrow, Stop } from '@material-ui/icons';


var toWav = require('audiobuffer-to-wav')
const UPLOAD_FILE = gql`
  mutation UploadFile($file:Upload!,$roomid:String,$speaker:String){
      UploadFile(file:$file,roomid:$roomid,speaker:$speaker)
  }
`


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
    flex:1,
    color:"green",
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
    textAlign:"center"
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


export default function Reactmic(props){


  const auth = useContext(AuthContext)
    
  

  const classes = useStyles();
  
    const [state,setState] = useState({
        record:false,
      
    })

    const[uploadFile] = useMutation(UPLOAD_FILE,{
        onCompleted: data => console.log(data),
      })
 
  const blobToFile=(superBlob)=>{
    
   
    return superBlob;
}

  const startRecording = () => {
    setState({ record: true });
  }
 
  const stopRecording = () => {
    setState({ record: false });
  }
  const { room } = useParams()

  const audioProcess=(file)=>{
    
    let speaker = auth.userId
    
    if(!file) return
    uploadFile({ variables: { file,roomid:room,speaker:speaker } })
    
  }
 
  const onStop=(recordedBlob)=> {
    
    let recording = blobToFile(recordedBlob.blob)
    
    
    // audioProcess(recording)
  
  }
 

    return (
      
        
        // <div>
       
        // {/* <button onClick={startRecording} type="button">Start</button>
        // <button onClick={stopRecording} type="button">Stop</button> */}
        // <div className={classes.buttonroot}>
        // <Button className={classes.startbutton} onClick={startRecording}>Start</Button>
        // <Button className={classes.stopbutton} onClick={stopRecording}>Stop</Button>
        // <Button className={classes.donebutton} >
        // <Link className={classes.donebutton} to={`roomID=${room}/editpodcast`} >Done</Link>
        // </Button>
        // </div>
        // </div>

        <div className={classes.container}>
          <div className={classes.control}>
          <div className={classes.gif}>
          <ReactMic
          width="290"
          height="50"
          record={state.record}
          onStop={onStop}
          strokeColor="#ffffff"
          backgroundColor="#1976d2"
          bitRate={256000}     
          sampleRate={96000}
          timeSlice={3000} 
          minetype="audio/wav"
          />
          </div>
           
            <IconButton className={classes.iconmic}>
              <Icon>
                <Mic/>
              </Icon>
            </IconButton><IconButton className={classes.icon}>
              <Icon>
                <Done/>
              </Icon>
            </IconButton>
            

          </div>
        </div>

      
    )
  
}