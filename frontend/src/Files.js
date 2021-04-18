import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'

const filesQuery = gql`
    {
        files{
            url
        }
    }
`

export default  File = ()=>{
    const { data,loading } = useQuery(filesQuery)
    if(loading){
        return <div>loading</div>
    }
    return(
        <div>
            {data.files.map(x=>(
                <img
                style={{width:200}}
                key = {x}
                src = {`http://localhost:4000/public/${x}`}
                alt={x}
                />
            ))}
        </div>
    )
}