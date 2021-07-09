
import {gql, useMutation, useQuery} from '@apollo/client';
import { createMuiTheme, Grid, makeStyles, Paper, ThemeProvider } from '@material-ui/core'
import logo from '../logo.svg'
import {useContext} from 'react'
import AuthContext from '../context/auth-context'
import FindEpisode from './FindEpisode'
import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import ShowEpisode from './ShowEpisode'

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
      },
       backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#ffffff',

  },
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
      pollInterval: 500,
    })

      const [open, setOpen] = React.useState(false);
      const [id,setID] = React.useState(null);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = (data) => {
    setID(data);
    setOpen(!open);
  };



   if(loading) return <CircularProgress/>
   
    if(data){
      if(data.displayEpisode[0] === undefined){
        return <h1 className={classes.text}>Nothing Here to Show</h1>
      }
      
    
    return(
      <ThemeProvider theme={theme}>

       

      <Grid container spacing={3}>
       { data.displayEpisode.map(data=>{

      return (<Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper className={classes.paper}>
        <FindEpisode param={data}/>
         <Button variant="outlined" color="#ffffff" value={data} onClick={()=>{handleToggle(data)}}>
        Episode Detail
      </Button>
        </Paper>
        </Grid>
        )

    })}


    </Grid>
     <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>

        {id!==null?<ShowEpisode param={id}/>:<p/>}

      </Backdrop>
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