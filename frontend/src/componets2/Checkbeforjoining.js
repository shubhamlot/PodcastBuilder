
import { useContext, useState } from 'react'
import {Guests} from './AllUsers'
import AuthContext from '../context/auth-context'
export default function Checkbeforjoining(param){
    const [found,Setfound] = useState(true)
    const auth = useContext(AuthContext)
    let data ={
        room:param.roomid,
        userid:auth.userId
    }

    console.log(auth.userId)
    return(<Guests info={data}/>)
}