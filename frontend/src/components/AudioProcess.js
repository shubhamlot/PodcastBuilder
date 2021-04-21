import React from 'react'
import { userMutation, gql, useMutation } from '@apollo/client'


const UPLOAD_FILE = gql`
  mutation UploadFile($file:Upload!,$roomid:String,$speaker:String){
      UploadFile(file:$file,roomid:$roomid,speaker:$speaker){
        _id
        speaker
        file
      }
  }
`

export default function AudioProcess(){

    const[uploadFile] = useMutation(UPLOAD_FILE,{
      onCompleted: data => console.log(data),
    })

    const handlefileChange = (e) =>{
      const file = e.target.files[0]
      let roomid = "a887d8ae-3c6b-413f-a7fc-0ae0c8311dbe"
      let speaker = "606b367f6a34b008e829d1f4"
      if(!file) return
      uploadFile({ variables: { file,roomid:roomid,speaker:speaker } })
    }
    return(
      <div>
        <h1>upload file</h1>
        <input type="file" onChange={handlefileChange} />
      </div>
    )
}