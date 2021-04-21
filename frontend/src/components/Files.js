
import React from 'react'
import { useState } from 'react'

import {  gql, useQuery } from '@apollo/client'
import Username from './Username'

const SHOW_FILE = gql`
  query file ($roomid:String){
      files(roomid:$roomid){
        _id
        speaker
        file
      }
  }
`


export default function FS(){
    const{ loading,error,data} = useQuery(SHOW_FILE,{
      variables: {roomid:"a887d8ae-3c6b-413f-a7fc-0ae0c8311dbe"}
    })
   
    
   
    if (loading) return null

     
    let audio = []
    let users = []
    // console.log(data.files)
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
    

    return(
      <div >
        <h1>click</h1>
        {audio}
        <Username ids={users}/>
      </div>
    )
}

