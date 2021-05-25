import React from 'react'
import { userMutation, gql, useMutation, ApolloConsumer } from '@apollo/client'
import { useParams } from 'react-router'


const UPLOAD_FILE = gql`
  mutation UploadFile($file:Upload!,$roomid:String,$speaker:String){
      UploadFile(file:$file,roomid:$roomid,speaker:$speaker)
  }
`

export function AudioProcess(param){

    const[uploadFile] = useMutation(UPLOAD_FILE,{
      onCompleted: data => console.log(data),
    })

      const {room}="aee04343-1c85-41cb-b375-2493a8efa2b0"//useParams(0)
      // console.log(param)
      const file = param
      
      let speaker = "606b367f6a34b008e829d1f4"
      if(!file) return
      uploadFile({ variables: { file,roomid:room,speaker:speaker } })
  
      return(
        
        <ApolloConsumer>
        
        {client=>(
        <h1>file</h1>)}
        </ApolloConsumer>
      )
  
}