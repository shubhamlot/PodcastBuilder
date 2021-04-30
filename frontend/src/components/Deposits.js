import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { useParams } from 'react-router';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import AllGuests from './AllGuests';
import AllUsers from './AllUsers'

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const SHOW_FILE = gql`
query($id:String){
  findRoom(id:$id){
    roomID
    roomname
    creator
  }
}
`

export default function Deposits() {
  const classes = useStyles();
  const { room } = useParams()

  const{ loading,error,data} = useQuery(SHOW_FILE,{
    variables: {id:room}
  })
 
  if (loading) return null

  
  return (
    <React.Fragment>
      <Title>Room created by <AllGuests params={data.findRoom.creator}/></Title>
      <Typography component="p" variant="h4">
      {data.findRoom.roomname}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2021
      </Typography>
      <AllUsers/>
    </React.Fragment>
  );
}