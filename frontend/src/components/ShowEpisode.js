
import {gql, useMutation, useQuery} from '@apollo/client';
import {useContext} from 'react'
import { createMuiTheme, Grid, makeStyles, Paper, ThemeProvider } from '@material-ui/core'
import logo from '../logo.svg'
import React from 'react'

const useStyles = makeStyles((theme)=>({
    paper: {
        padding: theme.spacing(2),
        margin:20,
        width:"60%",
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
      width:"100%",
      height:"100%",
      display:"flex",
      

    },
    box:{
      flex:1,
      padding:10
    },
    imgbox:{
      flex:2,
      padding:10
    },
    audio:{
      width:"100%"
    }
}))

const GET_EPISODE = gql`
   query reviewEpisode($EpisodeID:String){
    reviewEpisode(EpisodeID:$EpisodeID){
        EpisodeName
        discription
        audioFile
        img
        
    }
  }
`

export default function ShowEpisode(param){

  const classes = useStyles()


   const{ loading,data} = useQuery(GET_EPISODE,{
      variables: {EpisodeID:param.param},
    //   pollInterval: 500,
    })
   if(loading)return <p>loading..</p>

   
  if(data){
     console.log(`http://localhost:4000/pythonAudio/${data.reviewEpisode.audioFile}`)
  return (

          
        
            <React.Fragment>
            <Paper className={classes.paper}>
            <div className={classes.container}>

            <div className={classes.imgbox}>
            <img className={classes.image} src={`http://localhost:4000/images/${data.reviewEpisode.img}`} alt="pic"/>
            </div>
            <div className={classes.box}>
            <h1>{data.reviewEpisode.EpisodeName}</h1>
            <h3>{data.reviewEpisode.discription}</h3>
            <audio controls className={classes.audio}>
              {data.reviewEpisode.audioFile}
              <source src={`http://localhost:4000/pythonAudio/${data.reviewEpisode.audioFile}`} type="audio/wav"></source>
              
            </audio>
            </div>
            </div>
            </Paper>
            </React.Fragment>
  
          
          
     
      )
    }
}





 // <Paper className={classes.paper}>
           
 //            <img className={classes.image} src={`http://localhost:4000/images/${data.reviewEpisode.img}`} alt="pic"/>
 //            <p classesName={classes.header}>{data.reviewEpisode.EpisodeName}</p>
 //            <p classesName={classes.discription}>{data.reviewEpisode.discription}</p>
            
 //            </Paper>