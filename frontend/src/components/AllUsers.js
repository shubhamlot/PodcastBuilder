import React from 'react'
import {  gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router'
import AllGuests from './AllGuests'
import { createMuiTheme, Icon, makeStyles, ThemeProvider, Grid } from '@material-ui/core'
import {  FaceSharp } from '@material-ui/icons'

const useStyles = makeStyles({
  container:{
    

    overflowY:"hidden"
  },

  avatar:{
    width:100,
    fontSize:"20px",
    textAlign:"center",
    margin:4,
    padding:4,
    width:"100%",
    height:70,
    borderRadius:10,
    backgroundColor:"#5DB7DE",
    color:"#000000"
  },
  orangeAvatar:{
   
    fontSize:"20px",
    textAlign:"center",
    margin:4,
    padding:4,
    width:"100%",
    height:70,
    borderRadius:10,
    backgroundColor:"#FF7F11",
    color:"#000000"
  },
  purpleAvatar:{
   
    fontSize:"20px",
    textAlign:"center",
    margin:4,
    padding:4,
    width:"100%",
    height:70,
    borderRadius:10,
    backgroundColor:"#F08080",
    color:"#000000"
  },
 
});


const SHOW_FILE = gql`
 query listGuests($roomId:String){
  
    listGuests(roomId:$roomId)
  
 }
`
export default function FS(){

    const theme = createMuiTheme({
      palette:{
        type:"dark"
      }
    })

    const classes = useStyles();
    const { room } = useParams()
    
    const{ loading,data} = useQuery(SHOW_FILE,{
      variables: {roomId:room},
      pollInterval:500,
    })
 
    if (loading) return null

     
    let guestList = []
   
    let classNameHolder = [classes.avatar,classes.orangeAvatar,classes.purpleAvatar]
    if(data){
      data.listGuests.map(guest=>{
        guestList.push(
      <Grid item xs={6}>
        <div key={guest} className={classNameHolder[Math.floor(Math.random()*3)]} >
        <Icon>
          <FaceSharp/>
        </Icon>
        <br></br>
        <AllGuests params={guest}/><br></br>
        </div>
      </Grid>
      )
      })
    }
    

    return(
     <ThemeProvider theme={theme}>
       <h3>Joined Guests</h3>
        <Grid container spacing={3}>
        {guestList}
         </Grid>
     </ThemeProvider>
    )
}



