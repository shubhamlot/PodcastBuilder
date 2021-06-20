import { ApolloProvider,ApolloClient, InMemoryCache } from '@apollo/client'
import {createUploadLink} from 'apollo-upload-client'
import CreateRoom from './components/CreateRoom'
import PodcastPortal from './components/PodcastPortal';
import Login from './components/Login';
import Home from './components/Home';
import CreateChannel from './components/CreateChannel' 
import Editor from './components/Editor' 
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Sigup from './components/Signup'
import InitJoin from './components/InitJoinRoom'
import { useState } from 'react';
import {AuthProvider} from './context/auth-context'


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
    isGuest:true
  })

  const login =(userId,username,isGuest)=>{
    setState({userId:userId,username:username,isGuest:isGuest})
    
  }
  // const logout =()=>{
  //  setState({userId:"",username:"",isGuest:true})

  // }
  return (
    

    <Router>
  

      
      <Switch>
      <ApolloProvider client={client}>
      <AuthProvider value={{username:state.username,userId:state.userId,isGuest:state.isGuest,login:login}}>
        <Route path="/roomID=:room" exact>
          <PodcastPortal/>
         
        </Route>
        <Route path="/createroom" exact>
          <CreateRoom/>
        </Route>
        <Route path="/initJoinRoom">
          <InitJoin/>
        </Route>
        <Route path="/" exact>
          <Sigup/>
        </Route>
        <Route path="/login" exact>
          <Login/>
        </Route>
        <Route path="/login/createChannel" exact>
          <CreateChannel/>
        </Route>
        
        <Route path="/Home" exact>
          <Home/>
        </Route>
        <Route path="/roomID=:room/editpodcast">
          <Editor/>
        </Route>
        
        <Route path="/createchannel" exact>
          <CreateChannel/>
        </Route>
        
        </AuthProvider>
        </ApolloProvider>
      </Switch>
      
  </Router>

  )}
export default App;
