

import { createMuiTheme, Grid, makeStyles, Paper, ThemeProvider } from '@material-ui/core'
import logo from '../logo.svg'

const useStyles = makeStyles((theme)=>({
    paper: {
        padding: theme.spacing(2),
        margin:20,
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
}))

export default function EpisodeDisplay(){
    const classes = useStyles()
    const theme = createMuiTheme({
      palette:{
        type:"dark"
      }
    })
    return(
      <ThemeProvider theme={theme}>
      <Grid container spacing={3}>
        {/* repeate this full grid while printing */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper className={classes.paper}>
            <div>
            <img src={logo} alt="pic"/>
            <h3>Podcast Name</h3>
            <p>here is the new podcast...</p>
            </div>
            </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper className={classes.paper}>
            <div>
            <img src={logo} alt="pic"/>
            <h3>Podcast Name</h3>
            <p>here is the new podcast...</p>
            </div>
            </Paper>
      </Grid> <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper className={classes.paper}>
            <div>
            <img src={logo} alt="pic"/>
            <h3>Podcast Name</h3>
            <p>here is the new podcast...</p>
            </div>
            </Paper>
      </Grid>
      {/* end */}
     
    </Grid>
    </ThemeProvider>
    )
}