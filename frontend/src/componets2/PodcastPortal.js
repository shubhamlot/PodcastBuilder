import PodcastRoom from "./PodcastRoom"
import Navbar from './Navbar'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core'
import { grey } from "@material-ui/core/colors"
import Copyright from "./Copyright"

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