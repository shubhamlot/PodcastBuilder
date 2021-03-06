import React, { useContext } from 'react';
import {  Menu, MenuItem, AppBar, Toolbar, Typography, Button, IconButton,makeStyles,ThemeProvider,createMuiTheme } from '@material-ui/core';
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
    width:"100%",
    backgroundColor:"#424242"
  },
  menu:{
    // backgroundColor:theme.palette.background.paper,
    color:"#ffffff",
    textDecoration:"none"
  }
}));


export default function NavBar() {
  const classes = useStyles();
  const auth = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  

 
   

  // console.log(auth)
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const logout=()=>{
    auth.logout()
    console.log(auth)
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

   const theme = createMuiTheme({
    palette: {
      type: 'dark',
     
    },
  });
 
  return (
  
    <ThemeProvider theme={theme}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
         
          <Typography variant="h6" className={classes.title}>
            PodcastBuilder
           
          </Typography>

          <Button  >
            <Link className={classes.button} to="/home">Home</Link>
          </Button> <Button >
            <Link className={classes.button} to="/channelinfo">Channel</Link>
          </Button> 
          {auth.isGuest ? <Button disabled ><Link className={classes.button} to="/createroom" >Create</Link></Button>:
           <Button ><Link className={classes.button} to="/createroom" >Create</Link></Button>}
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
                {/*<MenuItem >Profile</MenuItem>*/}
                <MenuItem>
                <Button >
               <Link className={classes.menu} to="/createChannel">CreateChannel</Link>
                </Button>
               </MenuItem>
                <MenuItem>
                  <Button onClick={logout} >
                  <Link className={classes.menu} to="/login" >Logout</Link>
                  </Button>
                </MenuItem>
                
              </Menu>
            </div>

        </Toolbar>
      </AppBar>
      </ThemeProvider>
  
  );
}
