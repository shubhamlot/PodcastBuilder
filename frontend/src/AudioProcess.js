import MicRecorder from 'mic-recorder-to-mp3';
import React, { useState } from 'react'

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
class AudioProcess extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            isRecording: false,
            blobURL: '',
            blobURLprev: '',
            blob:'',
            isBlocked: false,
          }
    }
    componentDidMount(){
        navigator.getUserMedia({ audio: true },
            () => {
              console.log('Permission Granted');
              this.setState({ isBlocked: false });
            },
            () => {
              console.log('Permission Denied');
              this.setState({ isBlocked: true })
            },
          );
          
    }

    

    start = () => {
        if (this.state.isBlocked) {
          console.log('Permission Denied');
        } else {
          Mp3Recorder
            .start()
            .then(() => {
              this.setState({ isRecording: true });
            }).catch((e) => console.error(e));
        }
      };

      stop = () => {
        Mp3Recorder
          .stop()
          .getMp3()
          .then(([buffer, blob]) => {
              console.log(blob)
              
            const blobURL = URL.createObjectURL(blob)
            this.setState({ blobURL, isRecording: false, blob });
          }).catch((e) => console.log(e));
      };
      stplayprev=()=>{
          console.log(this.state.blob)
        const blobURLprev = URL.createObjectURL(this.state.blob)
        this.setState({blobURLprev})
      }
    render(){
        return(
            <div>
                <button onClick={this.start} disabled={this.state.isRecording}>
  Record
</button>
<button onClick={this.stop} disabled={!this.state.isRecording}>
  Stop
</button>
<audio src={this.state.blobURL} controls="controls" />
<button onClick={this.stplayprev} >

 ply prev
</button>
<audio src={this.state.blobURLprev} controls="controls" />
            </div>
        )
    }
}

export default AudioProcess