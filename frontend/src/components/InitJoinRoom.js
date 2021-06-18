import React from 'react'
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
import {useState} from 'react'
import {  gql, useLazyQuery, useQuery } from '@apollo/client'
import { Redirect } from 'react-router'

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

export default function InitJoinRoom() {
  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      type: 'light'
    },
  });

  const [state,setstate] = useState({
      _isRoomFound:false,
      room:"",
      _isSubmitted:false
  })
  const roomIDRef = React.useRef()

  const [findroom ,{loading,data}] = useLazyQuery(FIND_ROOM,{
        variables: {id:state.room}
      })
      if(loading ) return <p>loading</p>
    

   
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
   
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
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
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </ThemeProvider>
  )
    }
    else{
      return <Redirect to={`roomID=${state.room}`}/> 
    }
}













// export default function InitJoinRoom(){



//     const FIND_ROOM = gql`
//     query($id:String){
//         findRoom(id:$id){
//           roomID
//           roomname
//           creator
//         }
//       }
// `



//     let [state,setstate] = useState('')

//    const handleChange = (e)=>{
//         setstate({roomid:e.target.value})
//     }

//         const room = useQuery(FIND_ROOM,{
//             variables: {id:state.roomid}
//           })
//           if(room.loading) return null
          
    
// if(room.data === undefined){
//     return(
      

//         <form onSubmit={room}>
//             <input type="text"  onChange={handleChange}
//             name="roomid" value={state.roomid} placeholder="eneter the Room ID"/>
//             <input type="submit" />
//         </form>
//     )
// }
// else{
//    return <Redirect to={`roomID=${state.roomid}`}/>
// }
// }