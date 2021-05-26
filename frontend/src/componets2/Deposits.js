import React from 'react';
import Link from '@material-ui/core/Link';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import Title from './Title';
import { useParams } from 'react-router';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import AllGuests from './AllGuests';
import AllUsers from './AllUsers'
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  title:{
    color:theme.palette.text.primary
  }


}));

const SHOW_FILE = gql`
query findroom($id:String){
  findRoom(id:$id){
    roomID
    roomname
    creator
  }
}
`

export default function Deposits() {
  const theme = createMuiTheme({
    palette: {
      type: 'dark'
    },
  });
  const classes = useStyles(theme);
  const { room } = useParams()

  const{ loading,error,data} = useQuery(SHOW_FILE,{
    variables: {id:room},
    
  })
 
  if (loading ) return <p>{data}</p>


  
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <Title className={classes.title}>Room created by <AllGuests params={data.findRoom.creator}/></Title>
      <Typography component="p" variant="h4">
      {data.findRoom.roomname}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2021
      </Typography>
      <AllUsers/>
      </ThemeProvider>
    </React.Fragment>
  );
}