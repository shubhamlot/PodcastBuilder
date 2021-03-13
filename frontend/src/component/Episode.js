import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import logo from '../logo.svg'
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    backgroundColor:"#424242",
    color:"#ffffff"
  },
  title: {
    lineHeight:5,
  },
  logo:{
      height:"100%",
      width:"100%",
  }
}));

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

export default function AutoGridNoWrap() {
  const classes = useStyles();

  return (
    
    <div className={classes.root} >
    <Grid >
      <Paper className={classes.paper}>
      <Grid item xs="12" style={{ textAlign:"center"}}>
        <Typography variant="h6" className={classes.title}>Message</Typography>
          </Grid>
        <Grid container wrap="nowrap" spacing={3}>
        
          <Grid item xs>
          <Typography><img className={classes.logo} src={logo}/></Typography>
          </Grid>
          <Grid item xs>
            <Typography style={{overflowY:"hidden"}}>{message}</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/*  */}

      <Paper className={classes.paper}>
      <Grid item xs="12" style={{ textAlign:"center"}}>
        <Typography variant="h6" className={classes.title}>message</Typography>
          </Grid>
        <Grid container wrap="nowrap" spacing={3}>
        
          <Grid item xs>
          <Typography><img className={classes.logo} src={logo}/></Typography>
          </Grid>
          <Grid item xs>
            <Typography style={{overflowY:"hidden"}}>{message}</Typography>
          </Grid>
        </Grid>
      </Paper>
      {/*  */}

      <Paper className={classes.paper}>
      <Grid item xs="12" style={{ textAlign:"center"}}>
        <Typography variant="h6" className={classes.title}>message</Typography>
          </Grid>
        <Grid container wrap="nowrap" spacing={3}>
        
          <Grid item xs>
          <Typography><img className={classes.logo} src={logo}/></Typography>
          </Grid>
          <Grid item xs>
            <Typography style={{overflowY:"hidden"}}>{message}</Typography>
          </Grid>
        </Grid>

        
      </Paper>

      <Paper className={classes.paper}>
      <Grid item xs="12" style={{ textAlign:"center"}}>
        <Typography variant="h6" className={classes.title}>message</Typography>
          </Grid>
        <Grid container wrap="nowrap" spacing={3}>
        
          <Grid item xs>
          <Typography><img className={classes.logo} src={logo}/></Typography>
          </Grid>
          <Grid item xs>
            <Typography style={{overflowY:"hidden"}}>{message}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
      <Grid item xs="12" style={{ textAlign:"center"}}>
        <Typography variant="h6" className={classes.title}>message</Typography>
          </Grid>
        <Grid container wrap="nowrap" spacing={3}>
        
          <Grid item xs>
          <Typography><img className={classes.logo} src={logo}/></Typography>
          </Grid>
          <Grid item xs>
            <Typography style={{overflowY:"hidden"}}>{message}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
      <Grid item xs="12" style={{ textAlign:"center"}}>
        <Typography variant="h6" className={classes.title}>message</Typography>
          </Grid>
        <Grid container wrap="nowrap" spacing={3}>
        
          <Grid item xs>
          <Typography><img className={classes.logo} src={logo}/></Typography>
          </Grid>
          <Grid item xs>
            <Typography style={{overflowY:"hidden"}}>{message}</Typography>
          </Grid>
        </Grid>
      </Paper>



      </Grid>
    </div>
   
    
  );
}
