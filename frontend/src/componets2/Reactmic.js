import { ReactMic } from 'react-mic';
import React, { useEffect, useState } from 'react' 
import {AudioProcess} from './AudioProcess'
import {gql, useMutation} from '@apollo/client';
import {Button, ThemeProvider} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

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
    color:"green"
  },
  soundwav:{
    
  }
}))


export default function Reactmic(){


    
  

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
 

  const audioProcess=(file)=>{
    let room="aee04343-1c85-41cb-b375-2493a8efa2b0"
    let speaker = "606b367f6a34b008e829d1f4"
    
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
        <Button className={classes.donebutton} >Done</Button>
        </div>
        </div>
      
    )
  
}