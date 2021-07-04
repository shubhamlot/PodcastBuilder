
import {gql, useMutation, useQuery} from '@apollo/client';
import { createMuiTheme, Grid, makeStyles, Paper, ThemeProvider } from '@material-ui/core'
import logo from '../logo.svg'
import {useContext} from 'react'
import AuthContext from '../context/auth-context'
import FindEpisode from './FindEpisode'

const useStyles = makeStyles((theme)=>({
    paper: {
        padding: theme.spacing(2),
        margin:20,
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
      text:{
        padding:40,
        color:"#ffffff"
      }
}))


const EPISODEDISPLAY = gql`
  query displayEpisode ($userId:String){
      displayEpisode(userId:$userId)
  }
`

const GET_EPISODE = gql`
   query reviewEpisode($EpisodeID:String){
    reviewEpisode(EpisodeID:$EpisodeID){
        EpisodeName
        discription
        audioFile
    }
  }
`

export default function EpisodeDisplay(){
    const classes = useStyles()
    const auth = useContext(AuthContext)
    const theme = createMuiTheme({
      palette:{
        type:"dark"
      }
    })

    const{ loading,data} = useQuery(EPISODEDISPLAY,{
      variables: {userId:auth.userId},
    //   pollInterval: 500,
    })



   if(loading) return<p>loading</p>
    console.log(data.displayEpisode)

    if(data){
    let bucket = []

    data.displayEpisode.map(data=>{
      bucket.push(<FindEpisode param={data}/>)
    })
  
    return(
      <ThemeProvider theme={theme}>

      

      <Grid container spacing={3}>
       {bucket}

    </Grid>
    </ThemeProvider>
    )
  }

  else{
    return (
      <ThemeProvider theme={theme}>
      <h1 className={classes.text}>Hmm... Seems Like You have not created any Episode Yet !</h1>
      <h1 className={classes.text}>Be a Creator to share your idea</h1>
      </ThemeProvider>)
  }
}