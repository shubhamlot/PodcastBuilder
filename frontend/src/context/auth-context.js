  
import React from 'react'


const AuthContext = React.createContext({
    token:null,
    userId:null,
    username:null,
    login:(userId,username)=>{},
    logout:()=>{}
})

export const AuthProvider = AuthContext.Provider
export default AuthContext 