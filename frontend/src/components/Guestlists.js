import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useContext } from 'react'
import { useParams } from 'react-router'
import AuthContext from '../context/auth-context'
import Username from './Username'



export default function Guestlists(){

    const auth = useContext(AuthContext)
    const { room } = useParams()

    const UPLOAD_GUEST = gql`
    mutation($guestid:String,$roomid:String){
        addToRoom(guestid:$guestid,roomid:$roomid)
      }
`


const[uploadGuest] = useMutation(UPLOAD_GUEST,{
    onCompleted: data => {
        console.log(data)
    }
    
})

   uploadGuest({variables:{guestid:auth.userId,roomid:room}})

     

    return<div>
        <h1>guests</h1>
        {/* <Username ids={guests}/> */}
    </div>
}