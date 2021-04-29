
import React from 'react'
import { useState } from 'react'

import {  gql, useQuery } from '@apollo/client'
import Username from './Username'
import { useParams } from 'react-router'

const SHOW_FILE = gql`
  query file ($roomid:String){
      files(roomid:$roomid){
        _id
        speaker
        file
      }
  }
`

// a887d8ae-3c6b-413f-a7fc-0ae0c8311dbe
export default function FS(){
    const { room } = useParams()
    
    const{ loading,error,data} = useQuery(SHOW_FILE,{
      variables: {roomid:room}
    })
   
    
   
    if (loading) return null

     
    let audio = []
    let users = []
     console.log(data)
    if(data.files){
    data.files.map((voice)=>{
        users.push({
          // _id:voice._id,
          speaker:voice.speaker
        })
        audio.push(
            <audio key={voice._id} controls>
            
          <source  src={`http://localhost:4000/Audio/${voice.file}`} type="audio/mpeg"></source>
        </audio>
        )
        }
       
    )
      }
    

    return(
      <div >
        <h1>click</h1>
        {audio}
        {/* <Username ids={users}/> */}
      </div>
    )
}

