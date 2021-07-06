import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Button,Link,makeStyles} from '@material-ui/core'
import AuthContext from '../context/auth-context'
import {Redirect} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  
  menu:{
    // backgroundColor:theme.palette.background.paper,
    color:"#ffffff",
    textDecoration:"none"
  }
}));


export default function SuccessPage(){
	const auth =React.useContext(AuthContext)
	const classes = useStyles();
	 const logout=()=>{
    auth.logout()
    return <Redirect to="/login"/>
  }
	return(
			<React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <div style={{ textAlign:"center" }}>
        	<h1>Your Channel has been Created Successfully!</h1>
        	<h4>you need to logout and login again to experience full creator mode</h4>
        	<Button variant="contained" onClick={logout} color="primary"><Link className={classes.menu} to="/login" >Logout</Link></Button>
        </div>
      </Container>
    </React.Fragment>
		)
}