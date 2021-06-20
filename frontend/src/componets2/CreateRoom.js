import { useMutation } from "@apollo/client";
import { Avatar, Button, Container, CssBaseline, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { Mic } from "@material-ui/icons";
import gql from "graphql-tag";
import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import NavBar from "./Navbar";
import AuthContext from '../context/auth-context'

const useStyles = makeStyles((theme) => ({


    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
 
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#000000",
        padding:'20px'
      },
    submit: {
      margin: theme.spacing(3, 0, 2),
     backgroundColor:theme.palette.secondary.main,
      '&:hover': {
          background: theme.palette.secondary.light,
        
       },
    },
  }));


  const CREATE_ROOM = gql`
mutation($roomname:String,$creator:String){
      createRoom(roomname:$roomname,creator:$creator){
       roomID
      }
   }
`
  

export default function CreateRoom(){

    const auth = useContext(AuthContext) 
    const [state, setState] = useState({
        roomID:null
        });

    const [createRoom] = useMutation(CREATE_ROOM,{
        onCompleted:data=>{
            console.log(data.createRoom.roomID)
            setState({roomID:data.createRoom.roomID})
        }
    })

    const roomnameRef = React.useRef()

    const handlesubmit=(e)=>{
        e.preventDefault()
        const roomname =roomnameRef.current.value
        const creator = auth.userId
        if(roomname.trim() === null){
            console.log("enetr the valid name")
        }
        else{
            createRoom({variables:{roomname,creator}})
            
        }
    }

    const classes = useStyles();
    if(state.roomID === null){
    return(
        <div>
        <NavBar/>
        <Container component="main" maxWidth="xs">
           <CssBaseline />
           <div className={classes.paper}>
           <Avatar className={classes.avatar}>
          <Mic />
        </Avatar>
             <Typography component="h1" variant="h5">
               Let's Create Episode on Builder....
             </Typography>
             <form className={classes.form} onSubmit={handlesubmit}  noValidate>
               <Grid container spacing={2}>
     
                 <Grid item xs={12}>
                   <TextField
                     variant="outlined"
                     inputRef={roomnameRef}
                     required
                     fullWidth
                     id="roomname"
                     label="Room Name"
                     name="roomname"
                     autoComplete="off"
                   />
                 </Grid>
                
                 
                 
               </Grid>
               <Button
                 type="submit"
                 fullWidth
                 variant="contained"
                 color="primary"
                 className={classes.submit}
               >
                 create
               </Button>
              
             </form>
           </div>
          
         </Container>
         </div>
    )}
    else{
        return(<Redirect to={`/roomID=${state.roomID}`}/>)
    }
}