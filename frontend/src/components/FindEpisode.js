
import {gql, useMutation, useQuery} from '@apollo/client';
import {useContext} from 'react'
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

    image:{
      width:"100%",
      height:"100%"
    },
    header:{
      fontWeight:"bold"
    },
    discription:{
      fontSize:"12"
    }
}))

const GET_EPISODE = gql`
   query reviewEpisode($EpisodeID:String){
    reviewEpisode(EpisodeID:$EpisodeID){
        EpisodeName
        discription
        img
    }
  }
`

export default function FindEpisode(param){

  const classes = useStyles()
   const{ loading,data} = useQuery(GET_EPISODE,{
      variables: {EpisodeID:param.param},
    //   pollInterval: 500,
    })
   if(loading)return <p>loading..</p>
    console.log(data.reviewEpisode)
  if(data){
  return (

           <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper className={classes.paper}>
            <div>
            <img className={classes.image} src={`http://localhost:4000/images/${data.reviewEpisode.img}`} alt="pic"/>
            <h3>{data.reviewEpisode.EpisodeName}</h3>
            <p>{data.reviewEpisode.discription}</p>
            </div>
            </Paper>
      </Grid>
          
          
     
      )
    }
}





 // <Paper className={classes.paper}>
           
 //            <img className={classes.image} src={`http://localhost:4000/images/${data.reviewEpisode.img}`} alt="pic"/>
 //            <p classesName={classes.header}>{data.reviewEpisode.EpisodeName}</p>
 //            <p classesName={classes.discription}>{data.reviewEpisode.discription}</p>
            
 //            </Paper>