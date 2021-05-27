import { ReactMic } from 'react-mic';
import React, { useContext, useEffect, useState } from 'react' 
import {AudioProcess} from './AudioProcess'
import {gql, useMutation} from '@apollo/client';
import {Button, ThemeProvider} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useParams } from 'react-router';
import AuthContext from '../context/auth-context'
import { Link } from 'react-router-dom';

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
  soundwav:{
    
  }
}))


export default function Reactmic(){


  const auth = useContext(AuthContext)
    
  

  const classes = useStyles();
  
    const [state,setState] = useState({
        record:false,
      
    })

    const[uploadFile] = useMutation(UPLOAD_FILE,{
        onCompleted: data => console.log(data),
      })
 
  const blobToFile=(theBlob)=>{
    
    theBlob.lastModifiedDate = new Date();
    theBlob.name = new Date().toISOString();
    return theBlob;
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
    
    let file = blobToFile(recordedBlob.blob)
   
    
    audioProcess(file)
  
  }
 

    return (
      
        
        <div>
        <ReactMic
          width="290"
          record={state.record}
          className={classes.soundwav}
          onStop={onStop}
          strokeColor="#ffffff"
          backgroundColor="#1976d2"
          />
        {/* <button onClick={startRecording} type="button">Start</button>
        <button onClick={stopRecording} type="button">Stop</button> */}
        <div className={classes.buttonroot}>
        <Button className={classes.startbutton} onClick={startRecording}>Start</Button>
        <Button className={classes.stopbutton} onClick={stopRecording}>Stop</Button>
        <Button className={classes.donebutton} >
        <Link className={classes.donebutton} to={`roomID=${room}/editpodcast`} >Done</Link>
        </Button>
        </div>
        </div>
      
    )
  
}