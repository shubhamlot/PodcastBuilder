
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



