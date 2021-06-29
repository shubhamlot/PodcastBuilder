import { TextField,Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import React,{useState,useContext} from 'react'
import AuthContext from '../context/auth-context'
import {  gql, useMutation } from '@apollo/client'
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100%',
      },
    },
    uploadbutton:{
        width:'25%',
        backgroundColor:'#ffd54f',
    }
  }));


const CREATE_EPISODE = gql`
  mutation CreateEpisodes($userId:String!,$EpisodeName:String!,$discription:String!,$profileImage:Upload!,$audioFile:String!){
    CreateEpisodes(userId:$userId,EpisodeName:$EpisodeName,discription:$discription,profileImage:$profileImage,audioFile:$audioFile)
  }
`



export default function Discription(param){
    const auth = useContext(AuthContext)
    console.log(param)
    const [file,setFile]=useState()
    const classes = useStyles();

    const[createepisode] = useMutation(CREATE_EPISODE,{
    onCompleted: data => {param.parentCallback(data) 
        console.log(data)},
    onError:err=>console.log(err)
  })
     const episodeNameRef = React.useRef()
     const discriptionRef = React.useRef()
     const audiofileRef = React.useRef()

    const handleSubmit=()=>{
        const episodeName = episodeNameRef.current.value
        const discription = discriptionRef.current.value
        const audioFile = audiofileRef.current.value
       
        createepisode({variables:{userId:auth.userId,EpisodeName:episodeName,
            discription:discription,profileImage:file,audioFile:audioFile}})
    }

    const handleChange=(e)=>{

       
        setFile(e.target.files[0])
    }
    return (
        <form className={classes.root} noValidate autoComplete="off">
             <TextField  variant="outlined" value={param.param.CombineFiles} inputRef={audiofileRef} disabled />
            <TextField  label="Episode Name" variant="outlined" inputRef={episodeNameRef} />
            <TextField  label="Discription" variant="outlined" inputRef={discriptionRef} multiline rows={4} />
            <Button className={classes.uploadbutton} variant="contained" name="file" onChange={handleChange} component="label">Cover Pic
            <input type="file" accept="image/png, image/jpeg" hidden 
            name="file" />
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
        </form>
    )
}