import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useContext } from 'react'
import { useParams } from 'react-router'
import AuthContext from '../context/auth-context'
import Username from '../components/Username'




const SHOW_USER = gql`
query user($id:String){
    finduser(id:$id){
      username
    }
  }
`

export default function AllGuests(props){

    const{ loading,error,data} = useQuery(SHOW_USER,{
        variables: {id:props.params}
      })
     if(loading) return null
     
     else {
       return data.finduser.username
     }
}