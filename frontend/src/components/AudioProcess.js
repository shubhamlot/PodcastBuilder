import React from 'react'
import { userMutation, gql, useMutation } from '@apollo/client'
import { useParams } from 'react-router'


const UPLOAD_FILE = gql`
  mutation UploadFile($file:Upload!,$roomid:String,$speaker:String){
      UploadFile(file:$file,roomid:$roomid,speaker:$speaker)
  }
`

export default function AudioProcess(){

    const[uploadFile] = useMutation(UPLOAD_FILE,{
      onCompleted: data => console.log(data),
    })

    const {room}=useParams(0)
    // console.log(room)

    const handlefileChange = (e) =>{
      const file = e.target.files[0]
      
      let speaker = "606b367f6a34b008e829d1f4"
      if(!file) return
      uploadFile({ variables: { file,roomid:room,speaker:speaker } })
    }
    return(
      <div>
        <h1>upload file</h1>
        <input type="file" onChange={handlefileChange} />
      </div>
    )
}