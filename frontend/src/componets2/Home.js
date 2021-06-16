import { Container, Grid, makeStyles, Paper } from "@material-ui/core";
import logo from '../logo.svg'
import EpisodeDisplay from "./EpisodeDisplay";
import NavBar from "./Navbar";
import AuthContext from '../context/auth-context'
import { useContext } from "react";

const useStyles = makeStyles((theme)=>({
  root:{
    backgroundColor:"#303030",
    height:"100%",
    minHeight:"100vh"
  }
}))

    

export default function Home(param){
  const classes = useStyles()
  const auth = useContext(AuthContext)
  console.log(auth)
    return(
        <div className={classes.root}>
        <NavBar username={auth.username}/>
       {/* <Box pt={4}>
            <Copyright />
          </Box> */}

        <EpisodeDisplay/>
        
       
        </div>

         
     

    )
}