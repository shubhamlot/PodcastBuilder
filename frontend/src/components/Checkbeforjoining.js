
import { useContext,useEffect } from 'react'
import AuthContext from '../context/auth-context'
import {gql, useMutation} from '@apollo/client'
import { Redirect } from 'react-router'

const ADD_GUEST = gql`
mutation ($guestid:String,$roomid:String){
  addToRoom(guestid:$guestid,roomid:$roomid)
}
`

export default function Checkbeforjoining(param){
   
    const auth = useContext(AuthContext)
    
    let info ={
        room:param.roomid,
        userid:auth.userId
    }

    const [addUser,{loading,data}] = useMutation(ADD_GUEST,{

        onCompleted:(data)=>{
            console.log(data)
        },
        onError:(error)=>{
            console.log(error)
        },
    })


    useEffect(()=>{
        addUser({variables:{guestid:info.userid,roomid:info.room}})
    })

    // const handle =(info)=>{
        
    // }

    // handle(info) 
    
   
    
    // if(loading || data===null){
    //     console.log(data)
    //  return <p>loading.........</p>
    // }
    
    if(loading) return <p>loading</p>
        return(<Redirect to={`roomID=${info.room}`}/>)

    
    
}