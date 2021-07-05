
import {gql, useMutation, useQuery} from '@apollo/client';
import {useContext} from 'react'
import { createMuiTheme, Grid, makeStyles, Paper, ThemeProvider } from '@material-ui/core'
import logo from '../logo.svg'
import React from 'react'

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
    },
    container:{
      lineHeight:"50%"
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
   
  if(data){
  return (

           
        
            <React.Fragment>
            <img className={classes.image} src={`http://localhost:4000/images/${data.reviewEpisode.img}`} alt="pic"/>
            <div className={classes.container}>
            <h3>{data.reviewEpisode.EpisodeName}</h3>
            <p>{data.reviewEpisode.discription}</p>
            </div>
            </React.Fragment>
  
          
          
     
      )
    }
}





 // <Paper className={classes.paper}>
           
 //            <img className={classes.image} src={`http://localhost:4000/images/${data.reviewEpisode.img}`} alt="pic"/>
 //            <p classesName={classes.header}>{data.reviewEpisode.EpisodeName}</p>
 //            <p classesName={classes.discription}>{data.reviewEpisode.discription}</p>
            
 //            </Paper>