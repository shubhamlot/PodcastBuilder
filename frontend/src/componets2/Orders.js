

//no used can be deleted

import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { Button, IconButton } from '@material-ui/core';
import { LocalConvenienceStoreOutlined, Mic } from '@material-ui/icons'
import MicRecorder from 'mic-recorder-to-mp3'
import {AudioProcess} from './AudioProcess'
import { Redirect } from 'react-router';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  button:{
    width:"100%",
   
  },
  record:{
    backgroundColor:theme.palette.secondary.main
  },
  done:{
    backgroundColor:theme.palette.success.main
  },
  box:{
    textAlign:"right",
    width:"100%",
   
  }
}));
var Mp3Recorder
export default function Orders() {
  const classes = useStyles();
  const [state,setState] = useState({
    _isRecording:false,
    blob:""
  })

  
  const startR=()=>{
      if(!state._isRecording){
        setState({blob:""})
        Mp3Recorder = new MicRecorder({ bitRate: 128 });
        Mp3Recorder.start()
        .then(()=>{
          setState({_isRecording:true})
        }).catch((e) => console.error(e))
      }

  }
  const stopR=()=>{

    Mp3Recorder
    .stop()
    .getMp3()
    .then(([buffer, blob]) => {
     
      setState({ blob, isRecording: false });
    }).catch((e) => console.log(e));

    
  }

  const donefun=()=>{
    console.log('clicked')
    // return <Redirect to='/editpodcast'/>
  }

  // if(state.blob){
  // AudioProcess(state.blob)
  // }
  
  return (
    <React.Fragment>
      <div className={classes.box} >
        <div className={classes.record}> <Button className={classes.button}
        onClick={state._isRecording ? stopR:startR}>
          {state._isRecording ? 'Stop':'Record'}</Button></div>
     
      <div className={classes.done} ><Button className={classes.button}
      onClick={donefun}>Done</Button></div>
       
      </div>
    </React.Fragment>
  );
}