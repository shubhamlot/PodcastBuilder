import { Box,makeStyles,Grid } from '@material-ui/core'
import logo from '../logo.svg'
import {  gql, useMutation,useQuery } from '@apollo/client'
const useStyles = makeStyles((theme) => ({
    box:{
        padding:10,
        borderRadius:5
    },
    root:{
        display:'flex'
    },
    item:{
        flex:1,
        margin:2,
        padding:5,

        
    },

    img:{
        
        width:150,
        height:150
    }
  }));

const SHOW_EPISODE = gql`
  query reviewEpisode($EpisodeID:String){
    reviewEpisode(EpisodeID:$EpisodeID){
        EpisodeName
        discription
        audioFile
    }
  }
`
export default function Review(param){
    console.log(param.param)
    const {loading,err,data} = useQuery(SHOW_EPISODE,{
        variables:{EpisodeID:param.param}
    })
    const classes = useStyles()
    if(loading) return <p>loading</p>
    console.log(data)
    return (
        <Box border={1} className={classes.box}>
            <Grid container className={classes.root}>
                <Grid item className={classes.item}>
                    <div>
                    <img className={classes.img} src={logo} alt="pic"/>
                    </div>
                    <div>
                        <p>participants</p>
                    </div>
                </Grid>
                <Grid item className={classes.item}>
                    <div>
                        <h1>{data.reviewEpisode.EpisodeName}</h1>
                    </div>
                    <div>
                        <p>{data.reviewEpisode.discription}</p>
                    </div>
                </Grid>
                <Grid item>
                    <audio controls>
                        <source  src={`http://localhost:4000/pythonAudio/${data.reviewEpisode.audioFile}`} type="audio/wav"/>
                    </audio>
                </Grid>
            </Grid>
        </Box>
    )
}