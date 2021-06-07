import {Redirect} from 'react-router-dom'
import React,{useContext, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {gql,useLazyQuery,useMutation, useQuery} from '@apollo/client'
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import AuthContext, {AuthProvider} from '../context/auth-context'



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" >
         Podcast Builder
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
    backgroundColor: "#000000",

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
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

const LOGIN_USER = gql`
query login($email:String,$password:String){
    login(email:$email,password:$password){
      _id
      username
      email
      isGuest
    }
  }
`
export default function Login(){

    const auth = useContext(AuthContext)
    const passwordRef = React.useRef()
    const emailRef = React.useRef()
 
    
    const [loginuser,{loading,data,called,err}] = useLazyQuery(LOGIN_USER,{
        
        onError:(err)=>{console.log(err)},
        onCompleted:(data)=>{
          
          auth.login(data.login._id,data.login.username,data.login.isGuest)
        }
    })
 
    
 

 
    
    const handleSubmit=(e)=>{
       e.preventDefault()
     
        const passwordG = passwordRef.current.value
        const emailG = emailRef.current.value

        if(passwordG.trim() === null ||
           emailG.trim() === null){
                console.log("enter the data")
           }
        else{
           
         
            loginuser({variables:{email:emailG,password:passwordG}})
            if(loading) return <p>loading..</p>
            
            
        }

    }


    //this is all for themes
    const theme = createMuiTheme({
        palette: {
          type: 'light'
        },
      });
  const classes = useStyles();
  
  if(err || data === undefined){
  return (
      <ThemeProvider theme={theme}>
   <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
               
                variant="outlined"
                inputRef={emailRef}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                inputRef={passwordRef}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                
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
            Login
          </Button>
          <Grid container justify="">
            <Grid item>
              <Link href="#" variant="body2">
                Dont have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    </ThemeProvider>
  );
  }

  else{
    return (<Redirect to='/home' />)
  }
}


