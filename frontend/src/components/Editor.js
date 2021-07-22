import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider,CssBaseline,Paper,Stepper,
  Step, StepLabel, Button, Typography } from '@material-ui/core';

import EditorFiles from './EditorFiles'
import Discription from './EditFileDiscription'
import Review from './Review'
import {Redirect,Link} from 'react-router-dom'




const useStyles = makeStyles((theme) => ({
    '@global': {
        '*::-webkit-scrollbar': {
          width: '0.4em'
        },
    },
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    
  },
  paperextra:{
    overflow:'auto',
    height: 300,
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  btn:{
    textDecoration:"none",
    color:"#000000"
  }
}));

const steps = ['Remove & Organize','Discription', 'Post or Download'];


const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary:{
      // light:"#a6d4fa",
      main:"#90caf9",
      // dark:"#648dae"
    },
    secondary:{
      main:"#f48fb1"
    },
    background:{
      // default:"#121212",
      // paper:"#303030"
    },
    
  },
});

function GetStepContent(step,classes) {


  const [listoutput ,setListoutput] = React.useState()
  const [id,setId] = React.useState()
  const handleCallback = (childData) =>{
    setListoutput(childData)
    
}



  const handleParentCallback = (childData)=>{
    console.log(childData.CreateEpisodes)
    setId(childData.CreateEpisodes)
  }

  switch (step) {
  
    case 0:
        return <EditorFiles parentCallback = {handleCallback}/>
    case 1:
        return <Discription param={listoutput} parentCallback={handleParentCallback}/>;
    case 2:
      return <Review param={id}/>;
    // case 3:
    //   return <Redirect to="/home"/>
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  // const [listoutput,SetListoutput] = React.useState([])
  const [done,setDone]=React.useState(false)
  const handleNext = () => {
    setActiveStep(activeStep + 1);
    console.log(activeStep+1)
    if(activeStep===2){
      setDone(true)
      return <Redirect to="/Home"/>
    }
  };

console.log(done)
if(!done){
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Finishing touch :)
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Thank You :)
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {GetStepContent(activeStep,classes)}
                <div className={classes.buttons}>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 
          <Link className={classes.btn} to="/home" >
          <Button className={classes.btn}  color="primary">Home</Button></Link>
                     : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        
      </main>
      </ThemeProvider>
    </React.Fragment>
  );}

}