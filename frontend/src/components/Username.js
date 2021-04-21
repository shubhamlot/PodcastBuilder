
import React from 'react'
import { useState } from 'react'

import {  gql, useQuery } from '@apollo/client'




const FIND = gql`
    query find($userid:[String]){
      finduser(ids:$userid){
        _id
        username
        email
        isGuest
      }
    }
`


export default function Username(ids){
    let speakers = []
    ids.ids.map(id=>{
        speakers.push(id.speaker)
    })
    const{ loading,error,data} = useQuery(FIND,{
        variables: {userid:speakers}
      })
      if (loading) return null
    
    // return data.finduser.username
    let users=[]
    data.finduser.map(user=>{
        users.push(
            <li>
                <h3>{user.username}</h3>
            </li>
        )
    })
    
   
    return <div>
        <ul>
            {users}
        </ul>
    </div>
}

