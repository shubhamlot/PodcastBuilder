import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, NativeSelect } from '@material-ui/core';
import {  gql, useMutation } from '@apollo/client'
import defaultimage from '../default.jpg'
import AuthContext from '../context/auth-context'


const CREATE_CHANNEL = gql`
  mutation CreateChannel($file:Upload!,$channelname:String,$discription:String,$contenttype:String,$language:String,$country:String,$creator:String){
    CreateChannel(file:$file,channelname:$channelname,discription:$discription,contenttype:$contenttype,language:$language,country:$country,creator:$creator)
  }
`



const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    margin:60,
    
  },
  img:{
    width:"70vh",
    hight:"70vh"
  },
  
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
    button:{
    width:"100%",
    backgroundColor:"#01579b",
    color:"#ffffff",
    '&:hover': {
      background: "#006064",  
   }
  },

  buttondisable:{
    width:"100%",
    backgroundColor:"#039be5"
  },

  form:{
    marginTop:20,
    width:"100%",
  },
  textfield:{
    width:"100%"
  },
  
}));

export default function CreateChannel() {
  const auth = useContext(AuthContext)
  const classes = useStyles();
  const[createchannel] = useMutation(CREATE_CHANNEL,{
    onCompleted: data => console.log(data),
    onError:err=>console.log(err)
  })


  const[contenttype,setContenttype]=React.useState('none')
  const[country,setContry]=React.useState('none')
  const[language,setLanguage]=React.useState('none')
  const[file,setFile]=React.useState('none')
  const [state,setState] = React.useState({
    file:defaultimage,
    _issubmitted:false
  })
  const[accepted,setAccepted] = React.useState(false)
  const handleChange = (event) => {

    switch(event.target.name){
      case 'contenttype':
        setContenttype({contenttype:event.target.value})
        break
      case 'country':
        setContry({country:event.target.value})
        console.log(country)
        break
      case 'language':
        setLanguage({language:event.target.value})
     
        break
      case 'accepted':
        if(accepted) setAccepted(false)
        else setAccepted(true)
       
        break
      case 'file':
        let file=URL.createObjectURL(event.target.files[0])
        setState({file:file})
        setFile(event.target.files[0])
        
        break
    }
    
  }

  const channelNameRef = React.useRef()
  const discriptionRef = React.useRef()

  const handleSubmit =(e)=>{
    e.preventDefault()
    const channelname = channelNameRef.current.value
    const discription = discriptionRef.current.value
    const filefinal = file
    const countryfinal = country.country
    const contenttypefinal = contenttype.contenttype
    const languagefinal = language.language
    console.log(file)
    if(channelname.trim() !== "" || discription.trim() !== ""){
      console.log("form submitted")
      setState({_issubmitted:true})
      createchannel({variables:{file:filefinal,channelname,
        discription,country:countryfinal,contenttype:contenttypefinal,
        language:languagefinal,creator:auth.userId}})
    }
  }

  

  // if(!state._issubmitted){
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={5}  >
        <div className={classes.image}>
          <img src={state.file} className={classes.img} alt="pic"/>
        </div>
        </Grid>
      <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create your channel
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit} noValidate> 

        <Grid container spacing={2}>
          <Grid item xs={12}>
          <TextField className={classes.textfield} inputRef={channelNameRef} 
          id="outlined-basic" label="Channel Name" variant="outlined"  required />
          </Grid>

          <Grid item xs={12}>
          <TextField
          inputRef={discriptionRef}
          className={classes.textfield} 
          id="outlined-textarea"
          label="Discription About Channel"
          rows={4}
          multiline
          variant="outlined"
          required
        />
          </Grid>

          <Grid item xs={4}>
          <InputLabel>Country</InputLabel>
          <NativeSelect
          id="demo-customized-select-native"
          value={country.country}
          onChange={handleChange}
          name="country"
         
        >
          <option aria-label="None" value="" />
          <option value={"India"}>India</option>
          
        </NativeSelect>
        
          </Grid>


          <Grid item xs={4}>
          <InputLabel>Language</InputLabel>
          <NativeSelect
          id="demo-customized-select-native"
          value={language.language}
          onChange={handleChange}
          name="language"
         
        >
          <option aria-label="None" value="" />
          <option value={"English"}>English</option>
          
        </NativeSelect>
        
          </Grid>

                    <Grid item xs={4}>
          <InputLabel>Content Type</InputLabel>
          <NativeSelect
          id="demo-customized-select-native"
          value={contenttype.contenttype}
          name="contenttype"
          onChange={handleChange}
         
        >
          <option aria-label="None" value="" />
          <option value={"Education"}>Education</option>
          
        </NativeSelect>
        
          </Grid>

          <Grid item xs={12}>
          <Button variant="contained" component="label">Add Cover Image
            <input type="file" accept="image/png, image/jpeg" hidden 
            name="file" onChange={handleChange}/>
            </Button>
          
          </Grid>

          <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox  onChange={handleChange} name="accepted" value={accepted}/>}
            label="Accept Terms and Conditons"
          />
          </Grid>
          
          <Grid item xs={12}>
          {accepted?
          <Button type="submit" className={classes.button}>Create My Channel</Button>
          :<Button type="submit" className={classes.buttondisable} disabled>Create My Channel</Button>}
          </Grid>
          
          
        </Grid>

       

        </form>
       

        </div>
      </Grid>
    </Grid>
  );
  //  }
  //  else{
  //    return <Redirect to="/home"/>
  //  }
}