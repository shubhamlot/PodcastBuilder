import React, { useContext } from 'react';
import {  Menu, MenuItem, AppBar, Toolbar, Typography, Button, IconButton,makeStyles } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth-context'


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
  appbar:{
    backgroundColor:"#424242"
  },
  menu:{
    color:"#ffffff",
    textDecoration:"none"
  }
}));


export default function NavBar() {
  const classes = useStyles();
  const auth = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  

 
   

  console.log(auth)
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 
  return (
    // <React.Fragment className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
         
          <Typography variant="h6" className={classes.title}>
            PodcastBuilder
           
          </Typography>

          <Button >
            <Link className={classes.button} to="/home">Home</Link>
          </Button> <Button >
            <Link className={classes.button}>Channel</Link>
          </Button> 
          {!auth.isGuest? <Button ><Link className={classes.button} to="/createroom">Create</Link></Button>:
           <Button disabled><Link className={classes.button} to="/createroom" >Create</Link></Button>}
          <Button >
            <Link className={classes.button} to="/initJoinRoom">Join</Link>
          </Button> 
          
          
          
          
          
          <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                
               <AccountCircle/>
                
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem >Profile</MenuItem>
                <MenuItem>
               <Link className={classes.menu} to="/createChannel">CreateChannel</Link>
               </MenuItem>
                <MenuItem  >
                  <Link className={classes.menu}>Logout</Link>
                </MenuItem>
                
              </Menu>
            </div>

        </Toolbar>
      </AppBar>
    // </React.Fragment>
  );
}
