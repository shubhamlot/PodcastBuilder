import React,{useState} from 'react'
import { Redirect } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import { userMutation, gql, useMutation } from '@apollo/client'



import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {  useLazyQuery, useQuery } from '@apollo/client'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        PodcastBuilder
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#212121",
    '&:hover': {
        background: "#000000",
        color:"#00000"
     },
  },
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

export default function CreateRoom() {
  const classes = useStyles();

      const UPLOAD_FILE = gql`
    mutation($roomname:String,$creator:String){
        createRoom(roomname:$roomname,creator:$creator){
          roomID
          roomname
          creator
        }
      }
`

  const theme = createMuiTheme({
    palette: {
      type: 'light'
    },
  });

  const [state,setState] = useState({
      roomid:"",
      _isRoomFound:false
  })
  const roomIDRef = React.useRef()

const[createRoom] = useMutation(UPLOAD_FILE,{
    onCompleted: data => {
        if(data){
        console.log(data)
        setState({roomid:data.createRoom.roomID})
        console.log(state)
        // setState({_isRoomFound:true})
        }
    }
})
    

   
    const handleSubmit =(e)=>{
        e.preventDefault()
       
        if(roomIDRef.current.value.trim() !== ""){
        createRoom({ variables: { roomname:roomIDRef.current.value,
            creator:"606b367f6a34b008e829d1f4" }} )
        }
    }
    
    if(state._isRoomFound===false){
      return (
   
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Room
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
        
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={roomIDRef}
            required
            fullWidth
            name="roomname"
            label="Room Name"
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
            Create
          </Button>
          
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </ThemeProvider>
  )
    }
    else{
      return <Redirect to={`roomID=${state.roomid}`}/> 
    }
}






























// export default function CreateRoom(){
     
//     const UPLOAD_FILE = gql`
//     mutation($roomname:String,$creator:String){
//         createRoom(roomname:$roomname,creator:$creator){
//           roomID
//           roomname
//           creator
//         }
//       }
// `

// const [state, setState] = useState(0);

// const[createRoom] = useMutation(UPLOAD_FILE,{
//     onCompleted: data => {
//         setState({roomid:data.createRoom.roomID})
//         console.log(state)
//     }
// })



//     const handleChange=(e)=>{
//         console.log(e.target.value)
//        setState({roomname:e.target.value})
//      }
//     const handleSubmit=(e)=>{
//     e.preventDefault()
   
   
//   createRoom({ variables: { roomname:state.roomname,creator:"606b367f6a34b008e829d1f4" } })
// }


//     if(!state.roomid){
//     return(
//         <form onSubmit={handleSubmit}>
//             <input type='text' placeholder="roomname" name="roomname" onChange={handleChange}
//              value={state.roomname}/>
//             <input type="submit"/> 
//         </form>
//     )
//     }
//     else{
      
//         return (
//             <Redirect to={`/roomID=${state.roomid}`} />
//             )
//     }
    

// }