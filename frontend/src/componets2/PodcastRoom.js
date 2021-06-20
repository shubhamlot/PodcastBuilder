import React from 'react';
import clsx from 'clsx';
import { createMuiTheme, makeStyles, ThemeProvider, Container, Grid, Paper } from '@material-ui/core';
import Reactmic from './Reactmic';
import Deposite from './Deposits'
import Files from './Files'
import Copyright from './Copyright'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
  },
  root: {
    display: 'flex',
    marginTop:40,
    backgroundColor:theme.palette.background
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `200px`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 300,
  },
  fixedHeightPortal: {
    height: 400,
    
  },

  recordControl:{
    marginTop:10,
    height:90
  }
  

}));

export default function Dashboard() {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
     
    },
  });
  const classes = useStyles();
  
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaperPortal = clsx(classes.paper, classes.fixedHeightPortal);
  
  return (
    <ThemeProvider theme={theme}>
    <div className={classes.root}>
     
      <main className={classes.content}>
       
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
           
            <Grid item xs={12} md={8} lg={8}>
              <Paper className={fixedHeightPaperPortal}>
                
                <Files/>
              </Paper>
            </Grid>
           
            <Grid item xs={12} md={4} lg={4}>
              <Grid>
              <Paper className={fixedHeightPaper}>
                <Deposite/>
                
              </Paper>
            </Grid>
            <Grid>
            <Paper className={classes.recordControl}>
              
              <Reactmic/>
           
              </Paper>
            </Grid>
            </Grid>
           
          </Grid>
          {/* <Box pt={4}>
            <Copyright />
          </Box> */}
        </Container>
      </main>
     
    </div>
    <Copyright/>
    </ThemeProvider>
  );
}