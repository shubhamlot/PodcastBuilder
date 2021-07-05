import { ApolloProvider,ApolloClient, InMemoryCache } from '@apollo/client'
import {createUploadLink} from 'apollo-upload-client'
import CreateRoom from './components/CreateRoom'
import PodcastPortal from './components/PodcastPortal';
import Login from './components/Login';
import Home from './components/Home';
import CreateChannel from './components/CreateChannel' 
import Editor from './components/Editor' 
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Signup from './components/Signup'
import InitJoin from './components/InitJoinRoom'
import { useState } from 'react';
import {AuthProvider} from './context/auth-context'
import PageNotFound404 from './components/PageNotFound404'

const client = new ApolloClient({
  link: createUploadLink({
    uri:'http://localhost:4000/graphql',
    addTypename: false
  }),
  cache: new InMemoryCache()

})




function App() {
  
  let [state,setState] = useState({
    username:'',
    userId:'',
    isGuest:true,
    token:null,
    tokenExpiration:null
  })

  const login =(userId,username,isGuest,token,tokenExpiration)=>{

    setState({token:token,tokenExpiration:tokenExpiration,userId:userId,username:username,isGuest:isGuest})
    
  }
  const logout =()=>{
   setState({userId:null,username:null,isGuest:true,token:null,tokenExpiration:null })

  }
  return (
    

    <Router>
  

      
      
      <ApolloProvider client={client}>
      <AuthProvider value={{username:state.username,userId:state.userId,isGuest:state.isGuest,login:login,token:state.token,tokenExpiration:state.tokenExpiration,logout}}>
        <Switch>

        {state.token && <Route path="/roomID=:room" component={PodcastPortal} exact />}
        {state.token && <Route path="/createroom" component={CreateRoom} exact/>}
        {state.token && <Route path="/initJoinRoom" component={InitJoin} exact/>}
        {!state.token && <Route path="/" component={Signup} exact/>}
        {!state.token && <Route path="/login" component={Login} exact/>}
        {state.token && <Route path="/login/createChannel" component={CreateChannel} exact/>}
        {state.token && <Route path="/Home" component={Home} exact/>}
        <Route path="/roomID=:room/editpodcast" component={Editor} />
        {state.token && <Route path="/createchannel" component={CreateChannel} exact/>}
       
         <Route component={PageNotFound404} />
         </Switch>
        </AuthProvider>
        </ApolloProvider>

      
  </Router>

  )}
export default App;
