import PodcastRoom from "./PodcastRoom"
import Navbar from './Navbar'
import {  makeStyles, ThemeProvider } from '@material-ui/core'

const useStyles = makeStyles((theme)=>({
    root:{
        backgroundColor:"#201A23"
    }
}))

export default function PodcastPortal(){
    const classes = useStyles()
    return(
        <ThemeProvider>
            <div className={classes.root}>
            <Navbar/>
            <PodcastRoom/>
           
            </div>
        </ThemeProvider>
    )
}