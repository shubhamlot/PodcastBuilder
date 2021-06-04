import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle, Pages } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import AuthContext, { AuthProvider } from '../context/auth-context'

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
    backgroundColor:"#263238"
  },
  menu:{
    color:"#263238",
    textDecoration:"none"
  }
}));

export default function NavBar() {
  const classes = useStyles();
  const auth = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="fixed">
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
          </Button> 
          
          
          
          
          <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose} >
                  <Link className={classes.menu}>Logout</Link>
                </MenuItem>
              </Menu>
            </div>

        </Toolbar>
      </AppBar>
    </div>
  );
}
