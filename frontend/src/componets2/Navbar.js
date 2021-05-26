import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Pages } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button:{
    color:"#ffffff",
    textDecoration:"none"
  },
  special:{
    backgroundColor:"#ffffff",
    color:"blue",
    textDecoration:"none",
    padding:5,
    borderRadius:5
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography variant="h6" className={classes.title}>
            PodcastBuilder
          </Typography>

          <Button >
            <Link className={classes.button} to="/home">Home</Link>
          </Button> <Button >
            <Link className={classes.button}>Channel</Link>
          </Button> <Button >
            <Link className={classes.button} to="/createroom">Create</Link>
          </Button> <Button >
            <Link className={classes.button} to="/initJoinRoom">Join</Link>
          </Button> <Button >
            <Link className={classes.special}>Logout</Link>
          </Button>

        </Toolbar>
      </AppBar>
    </div>
  );
}