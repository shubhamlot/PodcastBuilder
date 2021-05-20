import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { Button, IconButton } from '@material-ui/core';
import { Mic } from '@material-ui/icons'



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

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.box} >
        <div className={classes.record}> <Button className={classes.button}>Record</Button></div>
     
      <div className={classes.done}><Button className={classes.button}>Done</Button></div>
       
      </div>
    </React.Fragment>
  );
}