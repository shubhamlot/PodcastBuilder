import logo from './logo.svg';
import './App.css';
import AudioProcess from './components/AudioProcess'
import { ApolloProvider,ApolloClient, InMemoryCache } from '@apollo/client'
import {createUploadLink} from 'apollo-upload-client'
import FS from './components/Files'
import CreateRoom from './components/CreateRoom'
import Guestlists from './components/Guestlists'
import AuthContext from "./context/auth-context";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Userlogin from './components/userlogin'
import InitJoin from './components/InitJoinRoom'
import { useState } from 'react';

const client = new ApolloClient({
  link: createUploadLink({
    uri:'http://localhost:4000/graphql'
  }),
  cache: new InMemoryCache()

})
function App() {

  let [state,setState] = useState({
    username:'',
    userId:''
  })

  let login = (userId,username)=>{
    setState({userId:userId,username:username})
  }

  return (
    

    <Router>
  

      
      <Switch>
      <ApolloProvider client={client}>
      <AuthContext.Provider value={{
     userId:state.userId,username:state.username,
      login:login}}>
        <Route path="/roomID=:room">
          <Guestlists/>
          <AudioProcess/>
          <FS/>
         
        </Route>
        <Route path="/createroom" exact>
          <CreateRoom/>
        </Route>
        <Route path="/initJoinRoom">
          <InitJoin/>
        </Route>
        <Route path="/" exact>
          <Userlogin/>
        </Route>
        </AuthContext.Provider>
        </ApolloProvider>
      </Switch>
      
  </Router>
  
  )}
export default App;
