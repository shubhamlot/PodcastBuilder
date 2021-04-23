import {React,useState} from 'react'
import { Redirect } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import { userMutation, gql, useMutation } from '@apollo/client'




export default function CreateRoom(){
     
    const UPLOAD_FILE = gql`
    mutation($roomname:String,$creator:String){
        createRoom(roomname:$roomname,creator:$creator){
          roomID
          roomname
          creator
        }
      }
`

const [state, setState] = useState(0);

const[createRoom] = useMutation(UPLOAD_FILE,{
    onCompleted: data => {
        setState({roomid:data.createRoom.roomID})
        console.log(state)
    }
})



    const handleChange=(e)=>{
        console.log(e.target.value)
       setState({roomname:e.target.value})
     }
    const handleSubmit=(e)=>{
    e.preventDefault()
   
   
  createRoom({ variables: { roomname:state.roomname,creator:"606b367f6a34b008e829d1f4" } })
}


    if(!state.roomid){
    return(
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder="roomname" name="roomname" onChange={handleChange}
             value={state.roomname}/>
            <input type="submit"/> 
        </form>
    )
    }
    else{
      
        return (
            <Redirect to={`/roomID=${state.roomid}`} />
            )
    }
    

}