  
import React from 'react'


export default React.createContext({
    token:null,
    userId:null,
    username:null,
    login:(userId,username)=>{console.log(userId)},
    logout:()=>{}
})