
import React from 'react'
import {  gql, useQuery } from '@apollo/client'


const SHOW_FILE = gql`
  query{
      files
  }
`

export default function FS(){
    const{ loading,error,data} = useQuery(SHOW_FILE)

    if (loading) return null

        // const audioEl = document.getElementsByClassName("audio-element")[0]
        // audioEl.play()
     
    let audio = []
    data.files.map((voice)=>{

        audio.push(
            <audio controls>
          <source src={`http://localhost:4000/${voice}`} type="audio/mpeg"></source>
        </audio>
        )
       
    //   images.push(<li> <img key={pic} src={`http://localhost:4000/${pic}`} alt={pic}/></li>)
    
})

   
    
    return(
      <div >
        <h1>click</h1>
        
        {audio}
      </div>
    )
}

