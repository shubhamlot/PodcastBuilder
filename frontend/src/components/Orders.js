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
  Rbutton:{
    backgroundColor:theme.palette.secondary.main,
    borderRadius:"10px",
    padding:"10px",
    margin:"20px"
  },
  box:{
    textAlign:"center",
    height:"75px"
  }
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.box} >
      <IconButton className={classes.Rbutton}><Mic /></IconButton>
      </div>
    </React.Fragment>
  );
}