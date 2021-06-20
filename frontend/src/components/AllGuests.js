import { useQuery,gql } from '@apollo/client'

const SHOW_USER = gql`
query user($id:String){
    finduser(id:$id){
      username
    }
  }
`

export default function AllGuests(props){

    const{ loading,data} = useQuery(SHOW_USER,{
        variables: {id:props.params}
      })
     if(loading) return null
     
     else {
       return data.finduser.username
     }
}