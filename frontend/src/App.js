import logo from './logo.svg';
import './App.css';
import AudioProcess from './components/AudioProcess'
import { ApolloProvider,ApolloClient, InMemoryCache } from '@apollo/client'
import {createUploadLink} from 'apollo-upload-client'
import FS from './components/Files'
import CreateRoom from './components/CreateRoom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const client = new ApolloClient({
  link: createUploadLink({
    uri:'http://localhost:4000/graphql'
  }),
  cache: new InMemoryCache()

})
function App() {
  return (
    // 
    //   <AudioProcess/>
    //   <FS/>
    // 
    // <CreateRoom/>

    <Router>
  

      
      <Switch>
      <ApolloProvider client={client}>
        <Route path="/roomID=:room">
       
          <AudioProcess/>
          <FS/>
         
        </Route>
        <Route path="/" exact>
          <CreateRoom/>
        </Route>
        </ApolloProvider>
      </Switch>

  </Router>
  
  )}
export default App;
