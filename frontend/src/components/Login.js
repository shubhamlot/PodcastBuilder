import {Redirect} from 'react-router-dom'
import React,{useContext} from 'react';

import {gql,useLazyQuery} from '@apollo/client'
import {LockOutlined} from '@material-ui/icons';

import { makeStyles, ThemeProvider, Avatar,Button,CssBaseline,
   TextField,Link,Grid,createMuiTheme,Container,Typography } from '@material-ui/core';


import AuthContext from '../context/auth-context'






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
      token
      tokenExpiration
      isGuest
    }
  }
`
export default function Login(){

    const auth = useContext(AuthContext)
    const passwordRef = React.useRef()
    const emailRef = React.useRef()
 
    
    const [loginuser,{loading,data,err}] = useLazyQuery(LOGIN_USER,{
        
        onError:(err)=>{console.log(err)},
        onCompleted:(data)=>{
          
          auth.login(data.login._id,data.login.username,data.login.isGuest,data.login.token,data.login.tokenExpiration)
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
          <LockOutlined/>
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
      
    </Container>
    </ThemeProvider>
  );
  }

  else{
    return (<Redirect to='/home' />)
  }
}


