  
import React from 'react'


const AuthContext = React.createContext({
    token:null,
    userId:null,
    isGuest:true,
    tokenEpiration:null,
    login:(userId,isGuest,token,tokenEpiration)=>{},
    logout:()=>{},
   
})

export const AuthProvider = AuthContext.Provider
export default AuthContext 