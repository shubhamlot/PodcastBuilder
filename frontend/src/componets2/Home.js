import { Container, Grid, makeStyles, Paper } from "@material-ui/core";
import logo from '../logo.svg'
import EpisodeDisplay from "./EpisodeDisplay";
import NavBar from "./Navbar";



    

export default function Home(){

    return(
        <div>
        <NavBar/>
       {/* <Box pt={4}>
            <Copyright />
          </Box> */}

        <EpisodeDisplay/>
       
        </div>

         
     

    )
}