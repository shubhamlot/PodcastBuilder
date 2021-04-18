import React from 'react'
import {  gql, useMutation } from '@apollo/client'


const UPLOAD_FILE = gql`
  mutation UploadFile($file:Upload!){
      UploadFile(file:$file){
        url
      }
  }
`

export default function AudioProcess(){

    const[uploadFile] = useMutation(UPLOAD_FILE,{
      onCompleted: data => console.log(data),
    })

    const handlefileChange = (e) =>{
      const file = e.target.files[0]
      if(!file) return
      uploadFile({ variables: { file } })
    }
    return(
      <div>
        <h1>upload file</h1>
        <input type="file" onChange={handlefileChange} />
      </div>
    )
}

