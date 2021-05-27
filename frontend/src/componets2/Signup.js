import {Redirect} from 'react-router-dom'
import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {gql,useMutation} from '@apollo/client'
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';




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

const UPLOAD_USER = gql`
mutation($username:String,$email:String,$password:String){
      Signup(username:$username,email:$email,password:$password){
       _id
       username
       email
       isGuest
      }
   }
`
export default function Userlogin(){

    
   
 
    
    const [state, setState] = useState({
    _issubmitted:false
    });

    const [createUser] = useMutation(UPLOAD_USER,{
      onCompleted:data=>{
      setState({_issubmitted:true})}
      
  })

    const firstNameRef = React.useRef()
    const lastNameRef = React.useRef()
    const passwordRef = React.useRef()
    const emailRef = React.useRef()
 
    const handleSubmit=(e)=>{
       e.preventDefault()
        const firstName = firstNameRef.current.value
        const lastName = lastNameRef.current.value
        const password = passwordRef.current.value
        const email = emailRef.current.value
        
        if(firstName.trim() === null ||
           lastName.trim()=== null ||
           password.trim() === null ||
           email.trim() === null){
                console.log("enter the data")
           }
        else{

            createUser({variables:{username:firstName,email:email,password:password}})
            
        }

    }


    //this is all for themes
    const theme = createMuiTheme({
        palette: {
          type: 'light'
        },
      });
  const classes = useStyles();
  
  if(!state._issubmitted){
  return (
      <ThemeProvider theme={theme}>
   <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={firstNameRef}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                
                variant="outlined"
                inputRef={lastNameRef}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
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
            Sign Up
          </Button>
          <Grid container justify="">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
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
    return <Redirect to='/initJoinRoom'/>
  }
}


