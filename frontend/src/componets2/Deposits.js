import React from 'react';
import Link from '@material-ui/core/Link';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import Title from './Title';
import { useParams } from 'react-router';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import AllGuests from './AllGuests';
import AllUsers from './AllUsers'
import Title from './Title';
import { InfoSharp } from '@material-ui/icons';
import {} from '@material-ui/icons'
import { Button, Icon, IconButton, Popover } from '@material-ui/core';
import Loading from './loading'
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  title:{
    color:"#F1E9DB",
    flex:1
  },
  typography: {
    paddingLeft:10,
    paddingRight:10,
    fontSize:14,
    opacity:0.5
  },
  container:{
    display:"flex"
  },
  icon:{
    color:"#cfd8dc"
  },
  header:{
    color:"#607d8b"
  }
}));

const SHOW_FILE = gql`
query findroom($id:String){
  findRoom(id:$id){
    roomID
    roomname
    creator
  }
}
`

export default function Deposits() {

  const classes = useStyles();
  const { room } = useParams()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const{ loading,error,data} = useQuery(SHOW_FILE,{
    variables: {id:room},
    
  })
 
  if (loading ) return <Loading/>

 
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
  return (
    <React.Fragment>
      <div className={classes.container}>

      <div className={classes.title}>
      <h3 className={classes.title}>
      {data.findRoom.roomname}
      </h3>
      </div>

     <div>
        <IconButton className={classes.icon}
         aria-describedby={id}  color="primary" onClick={handleClick}>
        <Icon>
          <InfoSharp/>
        </Icon>
      </IconButton>
      
      <Popover
       
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Typography  className={classes.typography}>
          <p className={classes.header}>created by <AllGuests params={data.findRoom.creator}/></p>
          <p>on 15 jan 2021</p>
          <p>{room}</p>
        </Typography>
      </Popover>
      </div>
    
      
    </div>
    <AllUsers/>
    </React.Fragment>
  );
}