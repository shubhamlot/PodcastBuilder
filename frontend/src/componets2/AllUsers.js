
import React from 'react'
import { useState } from 'react'

import {  gql, useMutation, useQuery } from '@apollo/client'

import { Redirect, useParams } from 'react-router'
import AllGuests from './AllGuests'

import { FormHelperText, makeStyles } from '@material-ui/core'
import { Add } from '@material-ui/icons'


const useStyles = makeStyles({
  guestlist: {
    fontSize:"20px",
    textAlign:"center"
  },
});


const SHOW_FILE = gql`
 query listGuests($roomId:String){
  
    listGuests(roomId:$roomId)
  
 }
`
export default function FS(){
    const classes = useStyles();
    const { room } = useParams()
    
    const{ loading,error,data} = useQuery(SHOW_FILE,{
      variables: {roomId:room},
      pollInterval:500,
    })
 
    if (loading) return null

     
    let guestList = []
   
    
    if(data){
      data.listGuests.map(guest=>{
        guestList.push(<div key={guest} className={classes.guestlist}>
        <AllGuests params={guest}/><br></br>
        </div>)
      })
    }
    

    return(
      <div >
        {guestList}
      </div>
    )
}



const ADD_GUEST = gql`
mutation ($guestid:String,$roomid:String){
  addToRoom(guestid:$guestid,roomid:$roomid)
}
`

export function Guests(info){
  const [addGuest] = useMutation(ADD_GUEST,{
    onCompleted:()=>{console.log("added")}
  })
  
  let [found,setFound] = useState(false)
  
  const{ loading,error,data} = useQuery(SHOW_FILE,{
    variables: {roomId:info.info.room},
    
  })

  if (loading) return null

  

  if(data){
    data.listGuests.map(guest=>{
      if(guest === info.info.userId){
        setFound(true)
      }
    })
  }

  if(!found){
    // console.log("guest:"+info.info.userid+"room:"+info.info.room)
    addGuest({variables:{guestid:info.info.userid,roomid:info.info.room}})
  }
  console.log(info.info.room)
  return <Redirect to={`roomID=${info.info.room}`} />
  
}