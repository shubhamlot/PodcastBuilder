  
import React from 'react'


const AuthContext = React.createContext({
    token:null,
    userId:null,
    username:null,
    isGuest:true,
    login:(userId,username,isGuest)=>{},
    logout:()=>{}
})

export const AuthProvider = AuthContext.Provider
export default AuthContext 