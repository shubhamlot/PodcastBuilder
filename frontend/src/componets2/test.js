import { useState } from 'react';
import Recorder from 'recorder-js';


export default function Test(){
    const audioContext =  new (window.AudioContext || window.webkitAudioContext)();
    const recorder = new Recorder(audioContext, {
        // An array of 255 Numbers
        // You can use this to visualize the audio stream
        // If you use react, check out react-wave-stream
        // onAnalysed: data => console.log(data),
      });

      let isRecording = false;
      
      const [state,setState] = useState(null)


      navigator.mediaDevices.getUserMedia({audio: true})
  .then(stream => recorder.init(stream))
  .catch(err => console.log('Uh oh... unable to get stream...', err));


  const startRecording=()=>{
      
    recorder.start()
      .then(() => isRecording = true);
      console.log("start")
  }

  const stopRecording=()=>{
    recorder.stop()
      .then(({blob, buffer}) => {
        setState(blob);
        console.log("stop")
        // buffer is an AudioBuffer
      });
  }
  const download=()=>{
    console.log(state)
    Recorder.download(state, 'my-audio-file'); // downloads a .wav file
  }


  return(
      <div>
          <button onClick={startRecording}>start</button>
          <button onClick={stopRecording}>stop</button>
          <button onClick={download}>download</button>

      </div>
  )
}