import { Container, Grid, makeStyles, Paper } from "@material-ui/core";
import logo from '../logo.svg'
import EpisodeDisplay from "./EpisodeDisplay";
import NavBar from "./Navbar";
import AuthContext from '../context/auth-context'
import { useContext } from "react";


    

export default function Home(param){
  const auth = useContext(AuthContext)
  console.log(auth)
    return(
        <div>
        <NavBar username={auth.username}/>
       {/* <Box pt={4}>
            <Copyright />
          </Box> */}

        <EpisodeDisplay/>
       
        </div>

         
     

    )
}