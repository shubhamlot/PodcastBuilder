import { ReactMic } from 'react-mic';
import React, { useState } from 'react' 
import {AudioProcess} from './AudioProcess'
import {gql, useMutation} from '@apollo/client';


const UPLOAD_FILE = gql`
  mutation UploadFile($file:Upload!,$roomid:String,$speaker:String){
      UploadFile(file:$file,roomid:$roomid,speaker:$speaker)
  }
`


export default function Reactmic(){
  
    const [state,setState] = useState({
        record:false,
        file:""
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
   
    // setState({file})
    audioProcess(file)
  
  }
 
  
    return (
      
        
        <div>
        <ReactMic
          record={state.record}
          className="sound-wave"
          onStop={onStop}
          strokeColor="#000000"
          backgroundColor="#FF4081" />
        <button onClick={startRecording} type="button">Start</button>
        <button onClick={stopRecording} type="button">Stop</button>
        
        </div>
      
    )
  
}