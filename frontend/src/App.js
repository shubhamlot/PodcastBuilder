import logo from './logo.svg';
import './App.css';
// import AudioProcess from './components/AudioProcess'
import { ApolloProvider,ApolloClient, InMemoryCache } from '@apollo/client'
import {createUploadLink} from 'apollo-upload-client'
import FS from './components/Files'
import CreateRoom from './componets2/CreateRoom'
import Guestlists from './components/Guestlists'
import AuthContext from "./context/auth-context";
import PodcastPortal from './componets2/PodcastPortal';
import Login from './componets2/Login';
import Home from './componets2/Home';
import CreateChannel from './components/CreateChannel'
import Test from './componets2/Reactmic' 
import Editor from './componets2/Editor' 

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Sigup from './componets2/Signup'
import InitJoin from './componets2/InitJoinRoom'
import { useState } from 'react';
import {AuthProvider} from './context/auth-context'
import CombineFile from './componets2/CombineFile';

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
    userId:''
  })

  const login =(userId,username)=>{
    setState({userId:userId,username:username})
  }
  const logout =()=>{
   setState({userId:"",username:""})

  }
  return (
    

    <Router>
  

      
      <Switch>
      <ApolloProvider client={client}>
      <AuthProvider value={{username:state.username,userId:state.userId,login:login}}>
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
        
        <Route path="/test" exact>
          <Test/>
        </Route>
        
        </AuthProvider>
        </ApolloProvider>
      </Switch>
      
  </Router>
  
  )}
export default App;
