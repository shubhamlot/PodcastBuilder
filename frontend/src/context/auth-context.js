  
import React from 'react'


const AuthContext = React.createContext({
    token:null,
    userId:null,
    username:null,
    isGuest:true,
    tokenEpiration:null,
    login:(userId,username,isGuest,token,tokenEpiration)=>{},
    logout:()=>{}
})

export const AuthProvider = AuthContext.Provider
export default AuthContext 