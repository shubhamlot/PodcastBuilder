import React,{useState} from 'react'
import clsx from 'clsx';
import {Avatar, Button,Container,TextField, Typography, makeStyles,createMuiTheme,ThemeProvider} from '@material-ui/core';
import {  gql, useLazyQuery } from '@apollo/client'
import NavBar from './Navbar';
import { Mic } from '@material-ui/icons';
import Checkbeforjoining from './Checkbeforjoining'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor:"#000000",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
        background: theme.palette.secondary.light,
     },
  },
  container:{
    display:"flex",
    marginTop:100
  },
  sidepanel:{
   backgroundColor:"#fafafa"
  },
  list:{
   
    marginTop:10,
    padding:10,
    listStyleType:"none",
    borderRadius:5
  },
  orange:{
    backgroundColor:"#ffccbc"
  },
  yellow:{
    backgroundColor:"#fff9c4"
  },
  blue:{
    backgroundColor:"#b3e5fc"
  }
}));


    const FIND_ROOM = gql`
    query findRoom($id:String){
        findRoom(id:$id){
          roomID
          roomname
          creator
        }
      }
`

export default function InitJoinRoom() {
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      type: 'light',
     
    },
  });

  let classNameHolder = [classes.orange,classes.blue,classes.yellow]
  const [state,setstate] = useState({
      _isRoomFound:false,
      room:"",
      _isSubmitted:false
  })
  const roomIDRef = React.useRef()

  const [findroom ,{loading,data}] = useLazyQuery(FIND_ROOM,{
        variables: {id:state.room}
      })
      if(loading ) {return (<p>loading</p>)}
    

   
    const handleSubmit =(e)=>{
        e.preventDefault()
        setstate({room:roomIDRef.current.value})
        findroom()
        if(data){
          setstate({_isRoomFound:true})
          
        }
    }
    
    if(state._isRoomFound===false){

      
      return (
   
    <div>
    <NavBar/>
    <ThemeProvider theme={theme}>
    <div className={classes.container}>
      <Container maxWidth="xs">
     
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Mic />
        </Avatar>
        <Typography component="h1" variant="h5">
          Room ID
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
        
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={roomIDRef}
            required
            fullWidth
            name="roomid"
            label="RoomId"
            type="text"
            id="roomid"
            
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Join
          </Button>
          
        </form>
      </div>
      </Container>
      {/* <Box mt={8}>
        <Copyright />
      </Box> */}

{/*<div className={classes.sidepanel}>
        <Container maxWidth="xs">
          <h4>Created Rooms</h4>
          <ul>
          <li className={clsx(classes.list, classNameHolder[Math.floor(Math.random()*3)])}>aee04343-1c85-41cb-b375-2493a8efa2b0</li>
          <li className={clsx(classes.list, classNameHolder[Math.floor(Math.random()*3)])}>aee04343-1c85-41cb-b375-2493a8efa2b0</li>
          <li className={clsx(classes.list, classNameHolder[Math.floor(Math.random()*3)])}>aee04343-1c85-41cb-b375-2493a8efa2b0</li>
          <li className={clsx(classes.list, classNameHolder[Math.floor(Math.random()*3)])}>aee04343-1c85-41cb-b375-2493a8efa2b0</li>
          </ul>
        </Container>
    </div>*/}
    </div>
    </ThemeProvider>
</div>
  )
    }
    else{
      return <Checkbeforjoining roomid={state.room}/> 
    }
}
